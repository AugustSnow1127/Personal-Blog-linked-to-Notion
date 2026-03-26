"use client";

import { useState } from "react";
import s from "./resume.module.css";

type Lang = "en" | "zh";

export default function ResumePage() {
  const [lang, setLang] = useState<Lang>("en");
  const isZh = lang === "zh";

  return (
    <div className={`${s.pageWrapper} ${isZh ? s.pageWrapperZh : ""}`}>
      <button
        className={s.langBtn}
        onClick={() => setLang(isZh ? "en" : "zh")}
      >
        {isZh ? "English" : "中文"}
      </button>

      <div className={`${s.resume} ${isZh ? s.zhMode : ""}`}>
        {/* ===== LEFT SIDEBAR ===== */}
        <aside className={s.sidebar}>
          <div className={s.avatarWrap}>
            <div className={s.avatar}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/resume/avatar.png" alt={isZh ? "張家軒" : "Angus Chang"} />
            </div>
          </div>

          <div>
            {isZh ? (
              <>
                <h1 className={`${s.sidebarName} ${s.sidebarNameZh}`}>張家軒</h1>
                <div className={s.subtitle}>Angus Chang &bull; 全端軟體工程師</div>
              </>
            ) : (
              <>
                <h1 className={s.sidebarName}>
                  Angus Chang<br />
                  <span className={s.nameSubtext}>(Chia-Hsuan, Chang)</span>
                </h1>
                <div className={s.subtitle}>Software Engineer</div>
              </>
            )}
          </div>

          <section>
            <h2 className={`${s.sidebarHeading} ${isZh ? s.sidebarHeadingZh : ""}`}>
              {isZh ? "聯絡資訊" : "Contact"}
            </h2>
            <ul className={s.contactList}>
              <li><span className={s.icon}>&#9993;</span> <a href="mailto:angusqweas@gmail.com" className={s.contactLink}>angusqweas@gmail.com</a></li>
              <li><span className={s.icon}>&#9742;</span> {isZh ? "0989-870-618" : "+886 989-870-618"}</li>
              <li><span className={s.icon}>&#9679;</span> {isZh ? "高雄市左營區" : "Kaohsiung, Taiwan"}</li>
              <li><span className={s.icon}>&#128279;</span> <a href="https://linkedin.com/in/AugustSnow1127" target="_blank" rel="noopener noreferrer" className={s.contactLink}>linkedin.com/in/AugustSnow1127</a></li>
              <li><span className={s.icon}>&#128279;</span> <a href="https://augustsnow.com/projects/craftshorts" target="_blank" rel="noopener noreferrer" className={s.contactLink}>craftshorts.ai</a></li>
              <li><span className={s.icon}>&#128187;</span> <a href="https://github.com/AugustSnow1127" target="_blank" rel="noopener noreferrer" className={s.contactLink}>github.com/AugustSnow1127</a></li>
              <li><span className={s.icon}>&#128279;</span> <a href="https://www.augustsnow.com/resume" target="_blank" rel="noopener noreferrer" className={s.contactLink}>Online Resume</a></li>
            </ul>
          </section>

          <section>
            <h2 className={`${s.sidebarHeading} ${isZh ? s.sidebarHeadingZh : ""}`}>
              {isZh ? "技術能力" : "Skills"}
            </h2>

            <div className={s.skillGroup}>
              <div className={`${s.skillLabel} ${isZh ? s.skillLabelZh : ""}`}>
                {isZh ? "程式語言" : "Programming"}
              </div>
              <div className={s.pills}>
                <span className={s.pill}>JavaScript</span>
                <span className={s.pill}>TypeScript</span>
                <span className={`${s.pill} ${s.pillHighlight}`}>SQL</span>
              </div>
            </div>

            <div className={s.skillGroup}>
              <div className={`${s.skillLabel} ${isZh ? s.skillLabelZh : ""}`}>
                {isZh ? "前端" : "Frontend"}
              </div>
              <div className={s.pills}>
                <span className={s.pill}>React</span>
                <span className={s.pill}>Next.js</span>
                <span className={s.pill}>HTML / CSS</span>
              </div>
            </div>

            <div className={s.skillGroup}>
              <div className={`${s.skillLabel} ${isZh ? s.skillLabelZh : ""}`}>
                {isZh ? "後端" : "Backend"}
              </div>
              <div className={s.pills}>
                <span className={s.pill}>Node.js</span>
                <span className={s.pill}>NestJS</span>
                <span className={s.pill}>REST APIs</span>
                <span className={s.pill}>Redis</span>
              </div>
            </div>

            <div className={s.skillGroup}>
              <div className={`${s.skillLabel} ${isZh ? s.skillLabelZh : ""}`}>
                {isZh ? "資料庫" : "Database"}
              </div>
              <div className={s.pills}>
                <span className={`${s.pill} ${s.pillHighlight}`}>PostgreSQL</span>
                <span className={`${s.pill} ${s.pillHighlight}`}>MySQL</span>
              </div>
            </div>

            <div className={s.skillGroup}>
              <div className={`${s.skillLabel} ${isZh ? s.skillLabelZh : ""}`}>
                {isZh ? "雲端與 DevOps" : "Cloud & DevOps"}
              </div>
              <div className={s.pills}>
                <span className={`${s.pill} ${s.pillHighlight}`}>GCP</span>
                <span className={s.pill}>Docker</span>
                <span className={s.pill}>CI/CD</span>
              </div>
            </div>

            <div className={s.skillGroup}>
              <div className={`${s.skillLabel} ${isZh ? s.skillLabelZh : ""}`}>AI Skills</div>
              <div className={s.pills}>
                <span className={s.pill}>Claude Code</span>
                <span className={s.pill}>Claude Skills</span>
                <span className={s.pill}>Spec-Driven Dev</span>
                <span className={s.pill}>Context Mgmt</span>
              </div>
            </div>

            <div className={s.skillGroup}>
              <div className={`${s.skillLabel} ${isZh ? s.skillLabelZh : ""}`}>
                {isZh ? "工具與方法" : "Tools & Methods"}
              </div>
              <div className={s.pills}>
                <span className={s.pill}>Git</span>
                <span className={s.pill}>Agile / Scrum</span>
                <span className={s.pill}>Unit Testing</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className={`${s.sidebarHeading} ${isZh ? s.sidebarHeadingZh : ""}`}>
              {isZh ? "學歷" : "Education"}
            </h2>
            <div className={s.eduItem}>
              <div className={s.degree}>
                {isZh ? "資訊管理學系 學士" : "B.S. in Information Management"}
              </div>
              <div className={s.school}>
                {isZh ? "國立中正大學" : "National Chung Cheng University"}
              </div>
              <div className={s.year}>
                {isZh ? "2020 年畢業 — 嘉義" : "Graduated 2020 — Chiayi, Taiwan"}
              </div>
            </div>
          </section>

          <section>
            <h2 className={`${s.sidebarHeading} ${isZh ? s.sidebarHeadingZh : ""}`}>
              {isZh ? "語言能力" : "Languages"}
            </h2>
            <div className={s.langItem}>
              <span>{isZh ? "中文" : "Chinese (Mandarin)"}</span>
              <span className={s.langLevel}>{isZh ? "母語" : "Native"}</span>
            </div>
            <div className={s.langItem}>
              <span>{isZh ? "英文" : "English"}</span>
              <span className={s.langLevel}>{isZh ? "工作溝通程度" : "Professional Working"}</span>
            </div>
          </section>
        </aside>

        {/* ===== RIGHT MAIN CONTENT ===== */}
        <main className={s.content}>
          <section>
            <h2 className={s.contentHeading}>
              {isZh ? "專業簡介" : "Professional Summary"}
            </h2>
            <p className={s.summaryText}>
              {isZh ? (
                <>
                  擁有 3.5 年全端開發經驗的軟體工程師，曾任職於 Fortune 500 企業緯創資通，負責建構可擴展的 Web 應用程式與 AI 驅動的系統。
                  <mark className={s.hl}>透過 SQL 與架構優化，為 <strong>50+ 併發用戶</strong>降低 <strong>90%</strong> API 回應時間。</mark>
                  <mark className={s.hl}>目前獨立開發 AI 影音生成 SaaS，以分散式雲原生架構達成 <strong>99%+ 生成成功率</strong>。</mark>
                  具備 0 到 1 產品開發、跨部門領導與工程師指導的實證經歷。
                </>
              ) : (
                <>
                  Full-stack engineer with 3.5 years of experience at Wistron, a Fortune 500 manufacturer,
                  building scalable web applications and AI-powered systems.{" "}
                  <mark className={s.hl}>Reduced API response time by <strong>90%</strong> for <strong>50+ concurrent users</strong> through SQL and architecture optimization.</mark>{" "}
                  <mark className={s.hl}>Currently building AI video generation SaaS independently, achieving <strong>99%+ success rate</strong> with distributed cloud-native architecture.</mark>{" "}
                  Proven track record in 0-to-1 product development, cross-functional leadership, and mentoring engineers.
                </>
              )}
            </p>
          </section>

          <section>
            <h2 className={s.contentHeading}>
              {isZh ? "工作經歷" : "Work Experience"}
            </h2>

            {/* Wistron */}
            <div className={s.job}>
              <div className={s.jobHeader}>
                <span className={s.jobTitle}>
                  {isZh ? "全端軟體工程師" : "Software Engineer (Full-Stack)"}
                </span>
                <span className={s.jobDate}>
                  {isZh ? "2022/02 – 2025/07" : "Feb 2022 – Jul 2025"}
                </span>
              </div>
              <div className={s.jobCompany}>
                {isZh ? "緯創資通股份有限公司 — 高雄" : "Wistron Corporation — Kaohsiung, Taiwan"}
              </div>
              <ul className={s.jobList}>
                <li>
                  <mark className={s.hl}>
                    {isZh
                      ? <>主導建構企業級 AI 助理系統，整合 <strong>2 個自訂 LLM API</strong>，透過迭代式 prompt 優化與回饋驅動開發，達到 <strong>8/10 用戶滿意度</strong></>
                      : <>Architected an enterprise AI assistant system integrating <strong>2 custom LLM APIs</strong>, achieving an <strong>8/10 user satisfaction score</strong> through iterative prompt optimization and feedback-driven development</>}
                  </mark>
                </li>
                <li>
                  {isZh
                    ? "重構 50% 以上前端元件以適應 Ant Design 大版本升級，提升 80% 渲染與 API 回應速度"
                    : "Refactored 50%+ frontend components for an Ant Design major version upgrade, improving rendering and API response speed by 80%"}
                </li>
                <li>
                  <mark className={s.hl}>
                    {isZh
                      ? <>將多個企業系統的認證機制從 JWT 遷移至 Azure AD SSO（msal-react），為 <strong>200+ 用戶</strong>實現集中式身份管理</>
                      : <>Migrated authentication from JWT to Azure AD SSO across multiple enterprise systems using msal-react, enabling centralized identity management for <strong>200+ users</strong></>}
                  </mark>
                </li>
                <li>
                  {isZh
                    ? "3 年以上期間歷經 4 套不同企業系統的開發交付，快速適應不同業務領域，每週主持跨據點站會對齊優先級"
                    : "Delivered features across 4 distinct enterprise systems over 3+ years, rapidly adapting to different business domains while facilitating weekly cross-site standups to align priorities"}
                </li>
                <li>
                  {isZh
                    ? "擔任 5 人工程團隊的 Code Reviewer，落實編碼規範並在上線前攔截問題，維護程式碼品質"
                    : "Served as code reviewer for a 5-person engineering team, enforcing coding standards and catching issues before production to maintain code quality"}
                </li>
                <li>
                  {isZh
                    ? "指導 2 位新進工程師完成結構化入職培訓，使其在 4 個月內獨立貢獻核心功能"
                    : "Mentored 2 junior engineers through structured onboarding, enabling them to independently contribute to core features within 4 months"}
                </li>
              </ul>
            </div>

            {/* Taoyuan */}
            <div className={s.job}>
              <div className={s.jobHeader}>
                <span className={s.jobTitle}>
                  {isZh ? "軟體開發工程師（約聘）" : "Software Developer (Contract)"}
                </span>
                <span className={s.jobDate}>
                  {isZh ? "2021/10 – 2022/01" : "Oct 2021 – Jan 2022"}
                </span>
              </div>
              <div className={s.jobCompany}>
                {isZh ? "衛生福利部桃園療養院 — 桃園" : "Taoyuan Psychiatric Center — Taoyuan, Taiwan"}
              </div>
              <ul className={s.jobList}>
                <li>
                  {isZh
                    ? "使用 Vue.js 開發護理師與病人預約排程系統，將臨床人員的手動預約流程數位化"
                    : "Developed a nurse-patient appointment scheduling system using Vue.js, digitizing manual booking workflows for clinical staff"}
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className={s.contentHeading}>
              {isZh ? "重點專案" : "Key Projects"}
            </h2>

            <div className={s.project}>
              <div className={s.projectName}>
                {isZh ? "CraftShorts.ai（個人專案）" : "CraftShorts.ai (Side Project)"}
              </div>
              <div className={s.projectTech}>
                Next.js &bull; TypeScript &bull; Node.js &bull; Redis &bull; BullMQ &bull; Prisma &bull; PostgreSQL &bull; GCP Cloud Run
              </div>
              <ul className={s.projectList}>
                <li>
                  <mark className={s.hl}>
                    {isZh
                      ? <>獨立架構 AI 影音生成 SaaS，建構分散式任務佇列（Redis + BullMQ）串接 OpenAI、Stability AI、Vertex AI pipeline，搭配指數退避重試機制，達成 <strong>99%+ 生成成功率</strong></>
                      : <>Architected AI video generation SaaS as solo engineer, building distributed task queue (Redis + BullMQ) to orchestrate OpenAI, Stability AI, and Vertex AI pipelines with exponential backoff retry, achieving <strong>99%+ generation success rate</strong></>}
                  </mark>
                </li>
                <li>
                  {isZh
                    ? "實作 Stripe 訂閱基礎設施，透過事件去重與時間戳驗證實現冪等 webhook 處理，防止重複扣款"
                    : "Implemented Stripe subscription infrastructure with idempotent webhook handling using event deduplication and timestamp verification, preventing duplicate charges"}
                </li>
                <li>
                  <mark className={s.hl}>
                    {isZh
                      ? <>建構 GitLab CI/CD 自動化部署 pipeline，搭配多階段 Docker build 部署至 GCP Cloud Run，縮短 <strong>70%</strong> 部署時間</>
                      : <>Built automated CI/CD pipeline with GitLab, multi-stage Docker builds, and deployment to GCP Cloud Run, reducing deployment time by <strong>70%</strong></>}
                  </mark>
                </li>
                <li>
                  {isZh
                    ? "撰寫 SEO 優化文章提升自然搜尋流量；設計並執行精準廣告投放策略，進行用戶獲取與市場驗證"
                    : "Authored SEO-optimized blog content to drive organic traffic; designed and executed targeted ad campaigns for user acquisition and market validation"}
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
