"use client";

import Image from "next/image";
import { heroImage, sectionDescription, team } from "@/features/home/content/landingContent";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import RevealOnScroll from "@/shared/ui/RevealOnScroll";
import styles from "./TeamSection.module.css";

export default function TeamSection() {
  const { messages } = useLanguage();

  return (
    <section className={styles.section} id="team">
      <Image src={heroImage} alt="" className={styles.bg} fill sizes="100vw" />
      <div className={styles.overlay} />

      <RevealOnScroll className={styles.content}>
        <h2>{messages.team.title}</h2>
        <p>{messages.team.description || sectionDescription}</p>
        <div className={styles.grid}>
          {team.map((member, index) => (
            <RevealOnScroll
              key={member.name}
              as="article"
              className={styles.member}
              delay={140 + index * 90}
            >
              <Image src={member.image} alt={member.name} width={100} height={100} />
              <h3>{member.name}</h3>
              <span>{messages.team.role || member.role}</span>
            </RevealOnScroll>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
