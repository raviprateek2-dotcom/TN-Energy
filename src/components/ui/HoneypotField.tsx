import React from "react";

export function HoneypotField({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "-9999px",
        top: "-9999px",
        opacity: 0,
        pointerEvents: "none",
        visibility: "hidden",
      }}
      aria-hidden="true"
    >
      <label htmlFor="hp_company_website">Please leave this field empty</label>
      <input
        id="hp_company_website"
        type="text"
        name="website"
        value={value || ""}
        onChange={onChange}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
