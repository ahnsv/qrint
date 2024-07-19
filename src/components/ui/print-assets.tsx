// components/PrintAssets.js
"use client";

import { useEffect } from "react";
import Image from "next/image";

const PrintAssets = ({ assets }: { assets: string[] }) => {
  useEffect(() => {
    window.print();
  }, []);

  const isPDF = (asset: string) => asset.endsWith(".pdf");
  const Assets = () =>
    assets.map((asset, index) =>
      isPDF(asset) ? (
        <embed
          src={asset}
          type="application/pdf"
          width="100%"
          height="1000px"
          key={index}
        />
      ) : (
        <Image
          src={asset}
          alt={`Asset ${index + 1}`}
          className="w-full"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }} // optionall
          key={index}
        />
      ),
    );

  return (
    <div className="print-page flex flex-col">
      <Assets />
    </div>
  );
};

export default PrintAssets;
