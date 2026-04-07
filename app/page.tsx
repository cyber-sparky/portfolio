import dynamic from 'next/dynamic';
import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Skills from '@/app/components/Skills';
import Projects from '@/app/components/Projects';
import HallOfFame from '@/app/components/HallOfFame';
import Blog from '@/app/components/Blog';
import Contact from '@/app/components/Contact';

const MatrixRain = dynamic(() => import('@/app/components/MatrixRain'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <MatrixRain />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <HallOfFame />
        <Blog />
        <Contact />
      </main>
    </>
  );
}
