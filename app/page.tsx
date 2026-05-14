import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Skills from '@/app/components/Skills';
// import Projects from '@/app/components/Projects';    // TODO: Uncomment when ready
// import HallOfFame from '@/app/components/HallOfFame'; // TODO: Uncomment when ready
// import Blog from '@/app/components/Blog';             // TODO: Uncomment when ready
// import GitHubActivity from '@/app/components/GitHubActivity'; // TODO: Uncomment when ready
import WriteupsCTA from '@/app/components/WriteupsCTA';
import Contact from '@/app/components/Contact';
import MatrixRainClient from '@/app/components/MatrixRainClient';

export default function Home() {
  return (
    <>
      <MatrixRainClient />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        {/* <Projects /> */}
        {/* <HallOfFame /> */}
        {/* <Blog /> */}
        {/* <GitHubActivity /> */}
        <WriteupsCTA />
        <Contact />
      </main>
    </>
  );
}
