import { useTranslation } from "../i18n/useTranslation";

export default function RulesModal({
  language,
  onClose,
}: {
  language: string;
  onClose: () => void;
}) {
  const { t } = useTranslation(language);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{t("game.rulesTitle")}</h2>
        <ol>
          <li>Each player writes a sentence and deliberately leaves it unfinished.</li>
          <li>The next player sees only the last few words of that sentence and must complete it before starting their own.</li>
          <li>Play continues round-robin until all turns are complete.</li>
          <li>Anyone can request a reveal at any time to see the full story.</li>
          <li>The game ends automatically when the sentence limit is reached.</li>
        </ol>
      </div>
    </div>
  );
}
