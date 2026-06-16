import HeroSection from '../../components/home/HeroSection';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import WhyChooseUs from '../../components/home/WhyChooseUs';
import AboutPreview from '../../components/home/AboutPreview';
import GalleryPreview from '../../components/home/GalleryPreview';
import ProcessPreview from '../../components/home/ProcessPreview';
import CTASection from '../../components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <AboutPreview />
      <GalleryPreview />
      <ProcessPreview />
      <CTASection />
    </>
  );
}
