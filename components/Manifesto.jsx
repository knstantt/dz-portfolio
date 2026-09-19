"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, FULL } from "@/lib/geometry";
import { UI } from "@/lib/site";

const PRINCIPLES = [
  {
    title: "Осознанный минимализм",
    text: "Пространство, свободное от визуального шума. Я отсекаю лишнее и оставляю только то, что действительно имеет значение, давая интерьеру возможность «дышать».",
  },
  {
    title: "Сдержанное благородство",
    text: "Красота не имеет смысла, если она нефункциональна. Интерьер должен обволакивать комфортом. Выверенная эргономика и незаметная интеграция технологичных решений делают пространство по-настоящему живым.",
  },
  {
    title: "Индивидуальный характер",
    text: "В строгих рамках лаконичности всегда есть место для вашей уникальности. Правильно подобранные предметы искусства, акцентная мебель и тщательно выстроенные сценарии освещения создают неповторимый почерк вашего дома.",
  },
  {
    title: "Уровень, который вы ожидаете",
    text: "Реализация проектов в премиум-сегменте требует не только безупречного вкуса, но и исключительного внимания к деталям и процессам. Я лично контролирую каждый этап: от разработки первой концепции до финальной расстановки мебели, гарантируя точность исполнения и соответствие самым высоким стандартам.",
  },
];

export default function Manifesto({ onContact }) {
  return (
    <article className="mx-auto max-w-[1240px] px-6 pb-24 pt-10 md:px-12 lg:px-16 lg:pt-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16">
        <div className="flex flex-col justify-between gap-16">
          <h1 className="text-[clamp(1.7rem,3.5vw,3.4rem)] font-light uppercase leading-[1.18]">
            Искусство жить в балансе. Дизайн, созданный для вас
          </h1>

          <div>
            <h2 className="text-[clamp(1.05rem,1.4vw,1.35rem)] font-normal uppercase">
              Философия дизайна
            </h2>
            <p className="mt-8 max-w-[52ch] text-[15px] leading-[1.75]">
              Каждый проект — это тонкое отражение личности владельца,
              обрамлённое в строгие, но выразительные формы. Мой авторский
              подход базируется на четырёх фундаментальных принципах:
            </p>
          </div>
        </div>

        <div className="lg:pt-24">
          <p className="max-w-[56ch] text-[15px] leading-[1.85] tracking-[0.05em]">
            Меня зовут Дмитрий Жиляков, и я создаю пространства, в которых форма
            подчиняется содержанию, а безупречная эстетика служит абсолютному
            комфорту. Мои проекты интерьеров для тех, кто ценит своё время,
            бескомпромиссное качество и выверенный до мелочей дизайн.
          </p>

          <motion.div
            className="relative mt-8 aspect-square w-full max-w-[560px] overflow-hidden bg-neutral-200"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: FULL }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
            >
              <Image
                src="/images/portrait.jpg"
                alt="Дмитрий Жиляков, портрет"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover grayscale"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="mt-24 grid gap-x-16 gap-y-16 lg:mt-32 lg:grid-cols-2 lg:gap-y-24">
        {PRINCIPLES.map((p) => (
          <section key={p.title}>
            <h3 className="text-[clamp(1.05rem,1.4vw,1.35rem)] font-normal uppercase">
              {p.title}
            </h3>
            <p className="mt-8 max-w-[52ch] text-[15px] leading-[1.75]">{p.text}</p>
          </section>
        ))}
      </div>

      <section className="mt-28 lg:mt-40 lg:pl-[24%]">
        <p className="max-w-[26ch] text-[clamp(1.5rem,2.8vw,2.7rem)] font-light leading-[1.3]">
          Ваш дом — это ваша личная территория спокойствия и силы. Давайте
          сделаем её совершенной.
        </p>
        <button
          type="button"
          onClick={onContact}
          className="mt-16 border-2 border-black px-14 py-5 text-sm font-semibold transition-colors hover:bg-black hover:text-white"
        >
          {UI.cta}
        </button>
      </section>
    </article>
  );
}
