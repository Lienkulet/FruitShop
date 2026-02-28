"use client";

import Image from "next/image";
import { countdown, products, sectionDescription } from "@/features/home/content/landingContent";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import RevealOnScroll from "@/shared/ui/RevealOnScroll";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import styles from "./DealSection.module.css";

export default function DealSection() {
  const { messages } = useLanguage();

  return (
    <section className={styles.deal} id="deal">
      <RevealOnScroll className={styles.header}>
        <div>
          <h2>{messages.deal.title}</h2>
          <p>{messages.deal.description || sectionDescription}</p>
        </div>
        <div className={styles.timer}>
          {countdown.map((item, index) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{messages.deal.countdown[index]}</span>
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <div className={styles.productGrid}>
        {products.map((item, index) => (
          <RevealOnScroll
            key={item.name}
            as="article"
            className={styles.productCard}
            delay={100 + index * 100}
          >
            <Image src={item.image} alt={messages.deal.productNames[index]} width={110} height={110} />
            <p className={styles.price}>{item.price}</p>
            <h3>{messages.deal.productNames[index]}</h3>
            <p className={styles.stars}>★ ★ ★ ★ ☆</p>
            <a href="#">{messages.deal.details}</a>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={160}>
        <PrimaryButton className={styles.cta}>{messages.deal.cta}</PrimaryButton>
      </RevealOnScroll>
    </section>
  );
}
