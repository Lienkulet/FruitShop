"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  featuredFruits,
  heroSlides,
} from "@/features/home/content/landingContent";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import RevealOnScroll from "@/shared/ui/RevealOnScroll";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { messages } = useLanguage();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const goToPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  const currentSlide = messages.heroSlides[activeSlide] ?? messages.heroSlides[0];

  return (
    <section className={styles.hero}>
      {heroSlides.map((slide, index) => (
        <Image
          key={`${slide.title}-${slide.image}-${index}`}
          src={slide.image}
          alt="Fresh fruits"
          className={`${styles.heroBg} ${index === activeSlide ? styles.activeSlide : ""}`}
          fill
          sizes="100vw"
          priority={index === 0}
        />
      ))}

      <div className={styles.overlay} />
      <button className={styles.arrow} aria-label="Previous slide" onClick={goToPreviousSlide}>
        ‹
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Next slide" onClick={goToNextSlide}>
        ›
      </button>

      <RevealOnScroll className={styles.content}>
        <h1>{currentSlide.title}</h1>
        <p>{currentSlide.subtitle}</p>
        <PrimaryButton>{currentSlide.cta}</PrimaryButton>
      </RevealOnScroll>

      <div className={styles.dots} aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <span
            key={`${slide.title}-${index}`}
            className={`${styles.dot} ${index === activeSlide ? styles.activeDot : ""}`}
          />
        ))}
      </div>

      <RevealOnScroll className={styles.fruitStrip} delay={120}>
        {featuredFruits.map((fruit, index) => (
          <RevealOnScroll
            key={`${fruit.name}-${fruit.image}`}
            as="article"
            className={styles.fruitItem}
            delay={180 + index * 80}
          >
            <Image src={fruit.image} alt={messages.featuredFruits[index]} width={112} height={112} />
            <h3>{messages.featuredFruits[index]}</h3>
          </RevealOnScroll>
        ))}
      </RevealOnScroll>
    </section>
  );
}
