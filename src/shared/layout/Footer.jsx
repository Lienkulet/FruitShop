"use client";

import { footerLinks, socialLinks } from "@/shared/config/navigation";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import RevealOnScroll from "@/shared/ui/RevealOnScroll";
import Brand from "@/shared/ui/Brand";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import styles from "./Footer.module.css";

export default function Footer() {
  const { messages } = useLanguage();
  const copy = messages.footerSection;

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.inner}>
        <RevealOnScroll className={styles.aboutCol}>
          <Brand />
          <p>{copy.about}</p>

          <div className={styles.socials}>
            {socialLinks.map((item) => (
              <a key={item.label} href="#" aria-label={item.label}>
                {item.icon}
              </a>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll className={styles.navCol} delay={80}>
          <h3>{copy.navigationTitle}</h3>
          <nav className={styles.footerLinks}>
            {footerLinks.map((href, index) => (
              <a key={`${href}-${index}`} href={href}>
                {messages.footer[index]}
              </a>
            ))}
          </nav>
        </RevealOnScroll>

        <RevealOnScroll className={styles.contactCol} delay={140}>
          <h3>{copy.contactsTitle}</h3>

          <div className={styles.contactBlock}>
            <h4>{copy.addressTitle}</h4>
            <p>{copy.addressValue}</p>
          </div>

          <div className={styles.contactBlock}>
            <h4>{copy.phoneTitle}</h4>
            <p>{copy.phoneValue}</p>
          </div>

          <div className={styles.contactBlock}>
            <h4>{copy.emailTitle}</h4>
            <p>{copy.emailValue}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className={styles.subscribeCol} delay={220}>
          <h3>
            {copy.subscribeTitlePrefix} <span>{copy.subscribeTitleAccent}</span>
          </h3>

          <form className={styles.subscribeForm} onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder={copy.emailPlaceholder} aria-label={copy.emailPlaceholder} />
            <PrimaryButton>{copy.subscribeButton}</PrimaryButton>
          </form>
        </RevealOnScroll>
      </div>
    </footer>
  );
}
