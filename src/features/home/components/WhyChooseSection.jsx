"use client";

import Image from "next/image";
import {
  centerFruitImage,
  chooseLeft,
  chooseRight,
  sectionDescription,
} from "@/features/home/content/landingContent";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import RevealOnScroll from "@/shared/ui/RevealOnScroll";
import styles from "./WhyChooseSection.module.css";

function FeatureIcon({ type }) {
  if (type === "team") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="9" r="2.5" />
        <path d="M3.8 18a4.2 4.2 0 0 1 8.4 0" fill="none" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 18a3.2 3.2 0 0 1 6.2 0" fill="none" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "fresh") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4v16M4 12h16M6.6 6.6l10.8 10.8M17.4 6.6L6.6 17.4" fill="none" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "gift") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <rect x="3" y="7" width="18" height="4" rx="1" />
        <path d="M12 7v13" fill="none" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "supplier") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 15l5-5 4 4 7-7" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 7h3v3" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "sustainable") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4c3 0 5 2.1 5 4.8 0 3.7-5 8.8-5 8.8S7 12.5 7 8.8C7 6.1 9 4 12 4z" fill="none" strokeWidth="2" />
        <path d="M9.7 11.2c1.4.2 2.7-.7 3-2.1" fill="none" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20l-6-3.2V7.2L12 4l6 3.2v9.6z" fill="none" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12.2l2 2 4-4" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhyChooseItem({ item, alignRight = false, delay = 0, description }) {
  return (
    <RevealOnScroll
      as="article"
      className={`${styles.item} ${alignRight ? styles.itemRight : ""}`}
      delay={delay}
    >
      {!alignRight && (
        <div className={styles.iconWrap}>
          <span className={styles.iconBubble}>
            <FeatureIcon type={item.icon} />
          </span>
        </div>
      )}

      <div className={styles.contentWrap}>
        <h3>{item.title}</h3>
        <span className={`${styles.iconLine} ${alignRight ? styles.iconLineRight : ""}`} />
        <p>{description}</p>
      </div>
      {alignRight && (
        <div className={`${styles.iconWrap} ${styles.iconWrapRight}`}>
          <span className={styles.iconBubble}>
            <FeatureIcon type={item.icon} />
          </span>
        </div>
      )}
    </RevealOnScroll>
  );
}

export default function WhyChooseSection() {
  const { messages } = useLanguage();

  const localizedLeft = chooseLeft.map((item, index) => ({
    ...item,
    title: messages.why.leftTitles[index] ?? item.title,
  }));

  const localizedRight = chooseRight.map((item, index) => ({
    ...item,
    title: messages.why.rightTitles[index] ?? item.title,
  }));

  return (
    <section className={styles.section} id="choose">
      <RevealOnScroll as="h2">{messages.why.title}</RevealOnScroll>
      <RevealOnScroll className={styles.description} delay={80}>
        {messages.why.description || sectionDescription}
      </RevealOnScroll>

      <div className={styles.grid}>
        <div className={styles.column}>
          {localizedLeft.map((item, index) => (
            <WhyChooseItem
              key={item.title}
              item={item}
              delay={140 + index * 90}
              description={messages.why.itemDescription}
            />
          ))}
        </div>

        <RevealOnScroll delay={200}>
          <Image
            src={centerFruitImage}
            alt="Assorted fruits"
            className={styles.image}
            width={464}
            height={414}
          />
        </RevealOnScroll>

        <div className={styles.column}>
          {localizedRight.map((item, index) => (
            <WhyChooseItem
              key={item.title}
              item={item}
              alignRight
              delay={140 + index * 90}
              description={messages.why.itemDescription}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
