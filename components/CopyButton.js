"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Button from "./Button";

const CopyButton = ({ text, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="secondary"
      size="sm"
      className={`p-2 ${className}`}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check size={16} className="text-success-green" />
      ) : (
        <Copy size={16} />
      )}
    </Button>
  );
};

export default CopyButton;
