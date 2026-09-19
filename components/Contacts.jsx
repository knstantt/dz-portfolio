"use client";

import { SITE } from "@/lib/site";

const LINKS = [
  { label: "Telegram", href: SITE.telegram },
  { label: "WhatsApp", href: SITE.whatsapp },
  { label: "MAX", href: SITE.max },
];

export default function Contacts() {
  return (
    <section className="mx-auto flex min-h-full max-w-[1240px] flex-col justify-between gap-20 px-6 pb-16 pt-14 md:px-12 lg:px-16 lg:pt-20">
      <div className="max-w-[560px]">
        <h1 className="text-[15px] font-normal uppercase tracking-[0.12em]">
          Для новых проектов и сотрудничества
        </h1>
        <p className="mt-4 text-[15px] leading-[1.85] tracking-[0.05em]">
          Мы всегда открыты к обсуждению интересных задач. Напишите нам, чтобы
          забронировать время для первой консультации и обсудить ваш будущий
          интерьер.
        </p>
      </div>

      <div>
        <a
          href={`mailto:${SITE.email}`}
          className="block w-fit text-[clamp(1.6rem,3.2vw,3rem)] font-medium leading-tight transition-opacity hover:opacity-60"
        >
          {SITE.email}
        </a>
        <a
          href={`tel:${SITE.phoneHref}`}
          className="mt-10 block w-fit text-[clamp(1.6rem,3.2vw,3rem)] font-medium leading-tight transition-opacity hover:opacity-60"
        >
          {SITE.phone}
        </a>

        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.15em] transition-opacity hover:opacity-50"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
