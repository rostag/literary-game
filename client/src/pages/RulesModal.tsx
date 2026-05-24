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
          <li>{t("game.rule1")}</li>
          <li>{t("game.rule2")}</li>
          <li>{t("game.rule3")}</li>
          <li>{t("game.rule4")}</li>
          <li>{t("game.rule5")}</li>
        </ol>
      </div>
    </div>
  );
}
