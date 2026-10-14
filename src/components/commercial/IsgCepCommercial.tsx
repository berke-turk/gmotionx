import React from "react";
import {
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Easing,
} from "remotion";
import { evolvePath } from "@remotion/paths";
import { InterFont } from "../../load-font";

// --- SVG PATH DEFINITIONS (Exact coordinates from public/assets/isg-logo.svg) ---
const PATH_IS_SHAPE =
  "M148.926 206.835H272.21C272.35 365.179 272.492 523.523 272.632 681.867C387.326 681.951 502.021 682.035 616.716 682.119C622.589 680.216 631.825 676.386 640.716 668.478C645.048 664.623 664.986 645.848 662.948 618.203C662.638 614.018 661.106 599.878 650.484 586.962C641.653 576.223 631.021 571.782 626.905 570.119C623.746 568.843 621.46 568.235 606.864 565.235C592.917 562.368 585.942 560.935 580.758 560.014C559.162 556.179 537.656 551.859 516.084 547.887C478.482 540.964 459.682 537.5 455.116 536.435C421.825 528.672 405.18 524.791 387.074 515.214C376.632 509.691 347.997 494.095 326.442 460.646C303.368 424.839 301.589 389.032 301.769 373.487C301.862 358.81 304.03 313.283 337.221 270.667C375.865 221.048 429.348 210.32 442.232 208.098C575.509 207.648 708.786 207.2 842.064 206.751L781.432 310.162L455.705 310.667C451.082 311.62 431.442 316.208 418.064 335.003C407.276 350.158 406.782 365.804 406.864 371.298C407.073 377.522 408.428 391.518 418.064 405.067C434.082 427.592 459.924 430.514 464.126 430.919C525.432 442.484 586.737 454.048 648.042 465.614C659.356 467.771 703.35 477.528 736.042 518.919C770.244 562.222 768.069 609.758 767.284 620.73C768.033 632.064 770.214 683.798 732.337 729.783C697.277 772.347 651.092 781.824 638.948 783.93C475.41 784.098 311.874 784.267 148.337 784.435L148.926 206.835Z";

const PATH_I_DOT =
  "M286.695 103.677C286.695 146.791 251.744 181.74 208.632 181.74C165.519 181.74 130.568 146.791 130.568 103.677C130.568 60.5639 165.519 25.6145 208.632 25.6145C251.744 25.6145 286.695 60.5639 286.695 103.677Z";

const PATH_G_OUTER =
  "M1399.12 165.067L1259.16 361.615C1251.12 347.083 1231.91 316.991 1194.82 294.415C1152.47 268.632 1111.43 267.645 1094.95 268.14C1083.43 268.328 1005.64 270.901 952.294 335.845C910.362 386.893 910.096 444.137 910.526 459.635C910.464 472.515 911.517 534.839 960.884 586.456C1007.37 635.06 1064.96 640.989 1078.78 642.035C1126.44 642.204 1174.11 642.372 1221.77 642.54V620.309C1236.21 605.393 1271.63 564.807 1282.74 501.067C1291.95 448.195 1279.85 405.672 1272.8 385.867C1294.19 357.067 1315.58 328.267 1336.97 299.467C1349.17 319.891 1388.81 390.468 1384.8 470.751C1384.08 485.225 1382.53 516.227 1366.88 552.772C1357.77 574.041 1346.85 590.247 1338.32 601.277C1331.69 608.941 1320.36 620.173 1303.45 629.404C1285.89 638.995 1269.7 642.384 1259.49 643.719C1273.22 646.107 1303.54 653.301 1332.25 677.909C1365.44 706.352 1376.56 740.98 1380.08 754.204C1382.38 765.096 1384.62 780.097 1384.46 797.993C1384.37 808.427 1384.07 827.676 1377.39 849.193C1367.09 882.34 1347.14 903.16 1337.3 913.193C1302.11 949.108 1260.55 960.904 1240.97 965.067C1185.39 965.179 1129.81 965.291 1074.23 965.404C1053.76 965.372 1015.55 962.608 973.516 942.161C934.586 923.224 909.901 897.641 897.053 882.204C888.798 872.32 879.568 859.573 871.116 843.804C859.652 822.411 853.424 802.552 849.894 787.215C867.133 782.669 884.538 777.955 902.105 773.067C917.07 768.903 931.868 764.689 946.498 760.435C949.557 772.989 958.99 804.359 988 831.004C1011.87 852.931 1037.34 860.943 1049.98 864.015C1095.96 864.043 1141.94 864.071 1187.92 864.099C1196.17 864.177 1203.37 864.231 1209.22 864.267C1224 864.359 1226.85 864.325 1230.69 863.593C1242.6 861.324 1250.69 854.891 1254.36 851.972C1274.37 836.052 1277.72 811.148 1278.36 805.404C1279.11 799.779 1279.35 791.701 1276.59 782.751C1268.95 757.98 1244.95 747.961 1240.97 746.372C1184.72 745.615 1128.46 744.856 1072.21 744.099C1048.74 742.379 963.454 733.289 892.253 663.172C807.84 580.044 807.229 474.169 807.453 455.088C807.781 425.572 812.69 360.617 855.284 296.099C925.162 190.251 1040.83 169.856 1061.43 166.583C1173.99 166.077 1286.55 165.572 1399.12 165.067Z";

const PATH_HELMET_ORANGE =
  "M942.105 477.488C993.853 477.677 1045.6 477.772 1097.35 477.772C1149.1 477.772 1200.84 477.677 1252.59 477.488C1253.82 475.964 1260.13 467.868 1258.82 456.436C1257.76 447.129 1252.3 441.304 1250.57 439.593C1246.69 439.677 1242.82 439.761 1238.95 439.845C1238.93 427.458 1237.23 394.414 1214.78 361.277C1192.88 328.961 1163.81 315.105 1152.31 310.33C1148.51 327.36 1144.52 344.569 1140.34 361.95C1138.01 371.628 1135.65 381.228 1133.26 390.75C1132.38 391.2 1130.86 391.822 1128.88 391.93C1126.06 392.082 1123.92 391.089 1122.99 390.582C1123.31 381.174 1123.75 371.601 1124.34 361.866C1125.58 340.986 1127.37 320.873 1129.57 301.572C1123.31 298.833 1111.85 294.797 1097.07 295.004C1083.45 295.193 1072.86 298.901 1066.75 301.572C1068.95 321.518 1070.63 342.424 1071.62 364.225C1072.03 373.133 1072.3 381.893 1072.46 390.498C1071.49 390.933 1069.85 391.518 1067.75 391.593C1065.39 391.677 1063.55 391.082 1062.53 390.666C1060.02 380.752 1057.55 370.73 1055.12 360.604C1051.01 343.518 1047.15 326.645 1043.51 309.993C1030.47 316.262 1005.3 330.537 984.463 358.92C960.135 392.056 955.473 425.677 954.316 440.182C950.611 440.238 946.905 440.294 943.2 440.35C941.384 442.836 937.688 448.609 936.968 456.856C936.055 467.333 940.533 475.03 942.105 477.488Z";

const PATH_GOGGLES_NAVY =
  "M1186.9 564.649C1170.38 570.876 1157.2 570.342 1154.48 570.209C1144.98 569.702 1139.88 567.516 1138.56 566.916C1131.84 563.889 1127.6 559.489 1124.75 556.476C1116.78 548.036 1117.08 543.276 1110.6 539.049C1105.84 535.929 1100.74 535.249 1097.14 535.169C1095.34 535.209 1093.16 535.396 1090.83 535.969C1088.51 536.542 1086.04 537.489 1083.66 539.049C1077.19 543.289 1077.5 548.036 1069.51 556.476C1066.66 559.489 1062.43 563.889 1055.71 566.916C1054.39 567.516 1049.3 569.702 1039.79 570.209C1037.07 570.342 1023.9 570.876 1007.36 564.649C1001.26 562.342 992.445 558.276 983.111 551.009C983.178 534.502 983.231 517.996 983.285 501.489C1021.35 501.662 1059.4 501.822 1097.47 501.996C1135.31 501.822 1173.15 501.649 1210.99 501.489C1211.04 517.996 1211.1 534.502 1211.15 551.009C1201.82 558.276 1193.02 562.342 1186.9 564.649ZM1219.75 489.702H974.525C973.73 489.98 971.923 490.728 970.414 492.561C969.043 494.226 968.61 495.942 968.458 496.769C968.542 516.982 968.627 537.196 968.711 557.409C971.765 560.529 976.498 564.942 982.951 569.276C1005.24 584.249 1032.15 587.556 1051.58 582.329C1056.82 580.929 1063.71 578.996 1070.02 573.316C1071.8 571.716 1075.92 567.676 1079.87 561.862C1080.46 560.996 1087.12 551.169 1091.07 549.742C1092.94 549.062 1094.44 548.902 1094.44 548.902C1094.44 548.902 1094.8 548.862 1097.14 548.729C1098.31 548.796 1098.98 548.836 1099.36 548.862C1099.74 548.889 1099.83 548.902 1099.83 548.902C1099.83 548.902 1101.32 549.062 1103.2 549.742C1107.15 551.169 1113.8 560.996 1114.4 561.862C1118.35 567.676 1122.47 571.716 1124.24 573.316C1130.56 578.982 1137.46 580.916 1142.7 582.329C1162.12 587.542 1189.02 584.249 1211.32 569.276C1217.78 564.942 1222.51 560.529 1225.55 557.409L1225.8 496.769C1225.53 495.841 1224.98 494.377 1223.8 492.898C1222.35 491.077 1220.68 490.14 1219.75 489.702Z";

const PATH_LETTER_C =
  "M422.138 915.105C415.569 915.105 409.912 913.554 405.168 910.452C400.423 907.35 396.774 903.077 394.219 897.633C391.665 892.19 390.387 885.97 390.387 878.976C390.387 871.859 391.695 865.579 394.311 860.135C396.956 854.661 400.636 850.388 405.35 847.317C410.094 844.215 415.629 842.664 421.955 842.664C426.882 842.664 431.322 843.576 435.275 845.401C439.229 847.225 442.468 849.78 444.992 853.065C447.516 856.349 449.083 860.181 449.691 864.56H438.925C438.104 861.367 436.279 858.539 433.451 856.075C430.653 853.582 426.882 852.335 422.138 852.335C417.941 852.335 414.261 853.429 411.098 855.619C407.966 857.778 405.517 860.835 403.753 864.788C402.02 868.711 401.153 873.319 401.153 878.611C401.153 884.024 402.005 888.738 403.708 892.752C405.441 896.767 407.874 899.884 411.007 902.104C414.17 904.324 417.88 905.434 422.138 905.434C424.935 905.434 427.475 904.947 429.756 903.974C432.037 903.001 433.968 901.602 435.549 899.777C437.131 897.953 438.256 895.763 438.925 893.208H449.691C449.083 897.344 447.577 901.07 445.175 904.385C442.802 907.669 439.655 910.285 435.732 912.231C431.839 914.147 427.308 915.105 422.138 915.105Z";

const PATH_LETTER_E =
  "M494.807 915.105C488.055 915.105 482.232 913.615 477.335 910.634C472.469 907.624 468.713 903.427 466.068 898.044C463.452 892.631 462.144 886.335 462.144 879.158C462.144 871.981 463.452 865.655 466.068 860.181C468.713 854.676 472.393 850.388 477.107 847.317C481.851 844.215 487.386 842.664 493.712 842.664C497.362 842.664 500.965 843.272 504.524 844.488C508.082 845.705 511.321 847.682 514.24 850.419C517.16 853.125 519.486 856.714 521.22 861.185C522.953 865.655 523.82 871.16 523.82 877.698V882.26H469.808V872.954H512.872C512.872 869 512.081 865.473 510.5 862.371C508.949 859.269 506.728 856.82 503.839 855.026C500.981 853.232 497.605 852.335 493.712 852.335C489.424 852.335 485.714 853.399 482.581 855.528C479.479 857.626 477.092 860.363 475.419 863.739C473.747 867.115 472.91 870.734 472.91 874.596V880.8C472.91 886.092 473.823 890.578 475.647 894.258C477.503 897.907 480.072 900.69 483.357 902.606C486.641 904.491 490.458 905.434 494.807 905.434C497.635 905.434 500.19 905.039 502.471 904.248C504.782 903.427 506.774 902.21 508.447 900.598C510.119 898.956 511.412 896.919 512.324 894.486L522.725 897.405C521.63 900.933 519.79 904.035 517.205 906.711C514.62 909.357 511.427 911.425 507.626 912.915C503.824 914.375 499.551 915.105 494.807 915.105Z";

const PATH_LETTER_P =
  "M540.197 939.921V843.576H550.598V854.707H551.875C552.666 853.49 553.761 851.939 555.16 850.054C556.589 848.138 558.627 846.435 561.272 844.945C563.949 843.424 567.568 842.664 572.129 842.664C578.029 842.664 583.23 844.139 587.731 847.089C592.232 850.039 595.744 854.22 598.269 859.634C600.793 865.047 602.055 871.433 602.055 878.793C602.055 886.214 600.793 892.646 598.269 898.089C595.744 903.503 592.247 907.7 587.776 910.68C583.306 913.63 578.151 915.105 572.312 915.105C567.811 915.105 564.207 914.36 561.5 912.87C558.794 911.349 556.711 909.631 555.251 907.715C553.791 905.768 552.666 904.157 551.875 902.879H550.963V939.921H540.197ZM550.78 878.611C550.78 883.902 551.556 888.571 553.107 892.615C554.658 896.63 556.923 899.777 559.904 902.058C562.884 904.309 566.534 905.434 570.852 905.434C575.353 905.434 579.109 904.248 582.12 901.876C585.161 899.473 587.442 896.25 588.962 892.205C590.513 888.13 591.289 883.598 591.289 878.611C591.289 873.684 590.529 869.244 589.008 865.29C587.518 861.306 585.252 858.159 582.211 855.847C579.2 853.505 575.414 852.335 570.852 852.335C566.473 852.335 562.793 853.445 559.813 855.665C556.832 857.854 554.582 860.926 553.061 864.88C551.541 868.803 550.78 873.38 550.78 878.611Z";

const PATH_UNDERLINE = "M336.172 890.444H148.551V882.36H336.172V890.444Z";

// === REUSABLE CLEAN PHONE MOCKUP (Strict Native 946:2048 Aspect Ratio, Sleek Bezel) ===
interface CleanPhoneProps {
  currentSrc: string;
  nextSrc?: string;
  dissolveProgress?: number;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const CleanPhone: React.FC<CleanPhoneProps> = ({
  currentSrc,
  nextSrc,
  dissolveProgress = 0,
  width = 356,
  height = 770,
  style = {},
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: "44px",
        // Sleek subtle Apple silver/titanium bezel
        border: "3.5px solid #C8D1CE",
        backgroundColor: "#0B0F14",
        // Soft diffused studio ambient shadow
        boxShadow: `
          0 32px 75px -16px rgba(15, 42, 46, 0.16),
          0 10px 28px -6px rgba(15, 42, 46, 0.08),
          0 0 0 1px rgba(15, 42, 46, 0.05)
        `,
        overflow: "hidden",
        flexShrink: 0,
        ...style,
      }}
    >
      {/* Interior Screen Surface */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          borderRadius: "40px",
        }}
      >
        <Img
          src={currentSrc}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "fill",
            opacity: 1 - dissolveProgress,
          }}
        />

        {nextSrc && dissolveProgress > 0 && (
          <Img
            src={nextSrc}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "fill",
              opacity: dissolveProgress,
            }}
          />
        )}
      </div>
    </div>
  );
};

export const IsgCepCommercial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // === DESIGN SYSTEM PALETTE (Clean, Editorial Scandinavian Modernist) ===
  const BG_COLOR = "#E8EEEC";
  const INK_DARK = "#0F2A2E"; // 95% Neutral dominant text
  const SAGE_MUTED = "#6B9080"; // Subtle category labels & accents
  const SUBTLE_TEXT = "#526B68"; // Secondary body text
  const CARD_BG = "#FFFFFF"; // Pure crisp white cards
  const CARD_BORDER = "1px solid rgba(15, 42, 46, 0.06)";
  const CARD_SHADOW =
    "0 20px 45px rgba(15, 42, 46, 0.06), 0 2px 8px rgba(15, 42, 46, 0.03)";

  // Brand Accents
  const ISG_NAVY = "#2F3592";
  const ISG_ORANGE = "#E18415";

  // Gentle float for subtle life without shaking
  const gentleDrift = Math.sin(frame * 0.025) * 4;

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        backgroundColor: BG_COLOR,
        overflow: "hidden",
        fontFamily: InterFont,
      }}
    >
      {/* 1. Official Voiceover Audio */}
      <Audio src={staticFile("voice.mp3")} />

      {/* 2. Clean Light-Mode Ambient Canvas with Subtle Radial Center Light */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 40%, #F5F8F7 0%, #E2E8E6 100%)
          `,
          zIndex: 1,
        }}
      />

      {/* Very Faint Delicate Grid Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(15, 42, 46, 0.032) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 42, 46, 0.032) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 50%, black 60%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 60%, transparent 95%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* ========================================================================= */}
      {/* SCENE 1: THE HOOK (Frames 0 - 148, 0.0s - 4.9s)                           */}
      {/* Voice: "Saha denetimleri ve İSG süreçleri hâlâ kâğıt üzerinde mi kaldı?" */}
      {/* ========================================================================= */}
      {frame < 152 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 64px",
            zIndex: 10,
            opacity: interpolate(frame, [140, 150], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `translateY(${interpolate(frame, [0, 150], [0, -10])}px)`,
          }}
        >
          {/* Subtle Category Label (NO pill, NO emoji, pure typography) */}
          {(() => {
            const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                style={{
                  opacity: labelOpacity,
                  color: SAGE_MUTED,
                  fontSize: "17px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                }}
              >
                Saha Denetimleri & İSG Süreçleri
              </div>
            );
          })()}

          {/* Main Clean Editorial Title (Pure Ink, NO gradient, generous line height) */}
          {(() => {
            const titleSpring = spring({
              frame: Math.max(0, frame - 8),
              fps,
              config: { damping: 16, stiffness: 140 },
            });
            return (
              <h1
                style={{
                  transform: `translateY(${(1 - titleSpring) * 30}px)`,
                  opacity: titleSpring,
                  fontSize: "58px",
                  fontWeight: 800,
                  lineHeight: "1.2",
                  color: INK_DARK,
                  letterSpacing: "-0.03em",
                  textAlign: "center",
                  marginBottom: "46px",
                  maxWidth: "800px",
                }}
              >
                Hâlâ kâğıt üzerinde
                <br />
                mi kaldı?
              </h1>
            );
          })()}

          {/* 3 Pure White Minimal Cards (NO emoji, delicate numbers, generous whitespace) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              width: "100%",
              maxWidth: "680px",
            }}
          >
            {[
              {
                num: "01",
                title: "Kaybolan Saha Defterleri",
                desc: "Tutanaklar arasında kaybolan saatler ve manuel arşivleme",
                delay: 20,
              },
              {
                num: "02",
                title: "Geciken DÖF Raporları",
                desc: "Saha denetimi sonrası ofiste saatler süren form hazırlığı",
                delay: 40,
              },
              {
                num: "03",
                title: "Yüzlerce Sayfa Mevzuat",
                desc: "6331 sayılı kanun ve yönetmelik maddelerine anında ulaşamama",
                delay: 60,
              },
            ].map((item, idx) => {
              const cardSpring = spring({
                frame: Math.max(0, frame - item.delay),
                fps,
                config: { damping: 16, stiffness: 150 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    transform: `translateY(${(1 - cardSpring) * 35}px)`,
                    opacity: cardSpring,
                    backgroundColor: CARD_BG,
                    borderRadius: "24px",
                    border: CARD_BORDER,
                    boxShadow: CARD_SHADOW,
                    padding: "24px 30px",
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                  }}
                >
                  {/* Minimal Numerical Indicator */}
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor: "#F0F4F2",
                      color: SAGE_MUTED,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      flexShrink: 0,
                    }}
                  >
                    {item.num}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        color: INK_DARK,
                        letterSpacing: "-0.01em",
                        marginBottom: "4px",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: "16px",
                        color: SUBTLE_TEXT,
                        fontWeight: 400,
                        lineHeight: "1.4",
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 2: HERO PRODUCT REVEAL (Frames 148 - 220, 4.9s - 7.3s)              */}
      {/* Voice: "İSG CEP ile tanışın."                                             */}
      {/* ========================================================================= */}
      {frame >= 145 && frame < 225 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 15,
            opacity: interpolate(frame, [145, 155, 215, 225], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {/* Top Header */}
          {(() => {
            const hSpring = spring({
              frame: Math.max(0, frame - 148),
              fps,
              config: { damping: 16, stiffness: 150 },
            });
            return (
              <div
                style={{
                  transform: `translateY(${(1 - hSpring) * -20}px)`,
                  opacity: hSpring,
                  textAlign: "center",
                  marginBottom: "26px",
                }}
              >
                <div
                  style={{
                    color: SAGE_MUTED,
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Mobil Denetim & Mevzuat Çözümü
                </div>
                <h2
                  style={{
                    fontSize: "52px",
                    fontWeight: 800,
                    color: INK_DARK,
                    letterSpacing: "-0.03em",
                    lineHeight: "1.15",
                    margin: 0,
                  }}
                >
                  İSG CEP ile tanışın.
                </h2>
                <p
                  style={{
                    fontSize: "19px",
                    color: SUBTLE_TEXT,
                    marginTop: "8px",
                    fontWeight: 400,
                  }}
                >
                  Tüm saha operasyonları cebinizde
                </p>
              </div>
            );
          })()}

          {/* Clean Front-Facing Studio iPhone (Exact 946:2048 Aspect Ratio, No Cutoffs) */}
          {(() => {
            const pSpring = spring({
              frame: Math.max(0, frame - 150),
              fps,
              config: { damping: 16, stiffness: 130 },
            });

            return (
              <div
                style={{
                  transform: `translateY(${(1 - pSpring) * 180 + gentleDrift}px)`,
                }}
              >
                <CleanPhone
                  currentSrc={staticFile("assets/isgcep/2.jpeg")}
                  width={360}
                  height={780}
                />
              </div>
            );
          })()}

          {/* Clean Minimal Editorial Feature Specs (Zero Pills, Pure Typography) */}
          <div
            style={{
              position: "absolute",
              bottom: "70px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
              color: SUBTLE_TEXT,
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            <span>Dijital Saha Arşivi</span>
            <span style={{ color: SAGE_MUTED, opacity: 0.5 }}>•</span>
            <span>Bulut Depolama Alanı</span>
            <span style={{ color: SAGE_MUTED, opacity: 0.5 }}>•</span>
            <span>6331 Sayılı Kanun Uyumlu</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 3: AI FIELD INSPECTION (Frames 220 - 365, 7.3s - 12.1s)             */}
      {/* Voice: "Sahada fotoğrafı çekin, yapay zekâ tehlikeleri anında analiz etsin." */}
      {/* ========================================================================= */}
      {frame >= 218 && frame < 370 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            opacity: interpolate(frame, [218, 228, 360, 368], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {/* Top Clean Editorial Title */}
          {(() => {
            const titleSpring = spring({
              frame: Math.max(0, frame - 222),
              fps,
              config: { damping: 16, stiffness: 160 },
            });
            return (
              <div
                style={{
                  transform: `translateY(${(1 - titleSpring) * -20}px)`,
                  opacity: titleSpring,
                  textAlign: "center",
                  marginBottom: "32px",
                  padding: "0 50px",
                }}
              >
                <div
                  style={{
                    color: SAGE_MUTED,
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Yapay Zekâ Destekli Denetim
                </div>
                <h2
                  style={{
                    fontSize: "48px",
                    fontWeight: 800,
                    color: INK_DARK,
                    lineHeight: "1.2",
                    letterSpacing: "-0.03em",
                    margin: 0,
                  }}
                >
                  Sahada fotoğrafı çekin,
                  <br />
                  <span style={{ color: SAGE_MUTED }}>
                    yapay zekâ tehlikeleri anında analiz etsin.
                  </span>
                </h2>
              </div>
            );
          })()}

          {/* Interactive Split Layout: Clean Phone Mockup on Left + 3 Crisp White Cards on Right */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "48px",
              width: "100%",
              padding: "0 60px",
            }}
          >
            {/* Clean Phone with Silky Cross-Dissolve: Camera 10.jpeg -> AI Analysis 12.jpeg */}
            {(() => {
              const dissolveProgress = interpolate(frame, [250, 256], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <CleanPhone
                  currentSrc={staticFile("assets/isgcep/10.jpeg")}
                  nextSrc={staticFile("assets/isgcep/12.jpeg")}
                  dissolveProgress={dissolveProgress}
                  width={350}
                  height={760}
                />
              );
            })()}

            {/* 3 Pure White Minimalist Cards on Right */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                width: "480px",
              }}
            >
              {/* Card 1: Uygunsuzluk Tespiti */}
              {(() => {
                const cSpring = spring({
                  frame: Math.max(0, frame - 265),
                  fps,
                  config: { damping: 16, stiffness: 160 },
                });
                return (
                  <div
                    style={{
                      transform: `translateY(${(1 - cSpring) * 30}px)`,
                      opacity: cSpring,
                      backgroundColor: CARD_BG,
                      borderRadius: "22px",
                      border: CARD_BORDER,
                      boxShadow: CARD_SHADOW,
                      padding: "24px 26px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: SAGE_MUTED,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Uygunsuzluk Tespiti
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#DC2626",
                          letterSpacing: "0.04em",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span
                          style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            backgroundColor: "#DC2626",
                            display: "inline-block",
                          }}
                        />
                        YÜKSEK RİSK
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: INK_DARK,
                        lineHeight: "1.3",
                      }}
                    >
                      Baret ve KKD Eksikliği
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        color: SUBTLE_TEXT,
                        marginTop: "4px",
                      }}
                    >
                      Şantiye alanı çalışanında koruyucu donanım saptanamadı
                    </div>
                  </div>
                );
              })()}

              {/* Card 2: Yasal Dayanak */}
              {frame >= 285 &&
                (() => {
                  const cSpring = spring({
                    frame: Math.max(0, frame - 285),
                    fps,
                    config: { damping: 16, stiffness: 160 },
                  });
                  return (
                    <div
                      style={{
                        transform: `translateY(${(1 - cSpring) * 30}px)`,
                        opacity: cSpring,
                        backgroundColor: CARD_BG,
                        borderRadius: "22px",
                        border: CARD_BORDER,
                        boxShadow: CARD_SHADOW,
                        padding: "22px 26px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: SAGE_MUTED,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: "6px",
                        }}
                      >
                        Yasal Dayanak & Mevzuat
                      </div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: 700,
                          color: INK_DARK,
                        }}
                      >
                        Yapı İşlerinde İSG Yönetmeliği
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: SUBTLE_TEXT,
                          marginTop: "2px",
                        }}
                      >
                        Ek-4 Asgari Sağlık ve Güvenlik Koşulları
                      </div>
                    </div>
                  );
                })()}

              {/* Card 3: Otomatik İşlem Süresi */}
              {frame >= 305 &&
                (() => {
                  const cSpring = spring({
                    frame: Math.max(0, frame - 305),
                    fps,
                    config: { damping: 16, stiffness: 160 },
                  });
                  return (
                    <div
                      style={{
                        transform: `translateY(${(1 - cSpring) * 30}px)`,
                        opacity: cSpring,
                        backgroundColor: CARD_BG,
                        borderRadius: "22px",
                        border: CARD_BORDER,
                        boxShadow: CARD_SHADOW,
                        padding: "20px 26px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: SAGE_MUTED,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          Analiz Hızı
                        </div>
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: INK_DARK,
                            marginTop: "2px",
                          }}
                        >
                          Anlık Yapay Zekâ Taraması
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "22px",
                          fontWeight: 800,
                          color: INK_DARK,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        0.4 sn
                      </div>
                    </div>
                  );
                })()}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 4: AI MEVZUAT ASİSTANI & DÖF RAPORLAMA (Frames 365 - 775, 12.1s - 25.8s)*/}
      {/* Voice: "6331 sayılı mevzuat ve tüm yönetmelikler, madde referanslı yapay zekâ asistanıyla 7/24 cebinizde. Tek dokunuşla resmi DÖF raporları oluşturun, OSGB ile anında paylaşın." */}
      {/* ========================================================================= */}
      {frame >= 362 && frame < 780 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 25,
            opacity: interpolate(frame, [362, 372, 768, 778], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {/* Top Title Switching Cleanly Between AI Legislation and DÖF Phase */}
          {(() => {
            const isDofPhase = frame >= 560;
            return (
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "32px",
                  padding: "0 60px",
                }}
              >
                <div
                  style={{
                    color: SAGE_MUTED,
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  {isDofPhase
                    ? "Resmi Format & Dijital Raporlama"
                    : "Mevzuat Kütüphanesi & Yapay Zekâ"}
                </div>
                <h2
                  style={{
                    fontSize: "48px",
                    fontWeight: 800,
                    color: INK_DARK,
                    lineHeight: "1.2",
                    letterSpacing: "-0.03em",
                    margin: 0,
                  }}
                >
                  {isDofPhase ? (
                    <>
                      Tek dokunuşla resmi DÖF raporları,
                      <br />
                      <span style={{ color: SAGE_MUTED }}>
                        OSGB ile anında paylaşım.
                      </span>
                    </>
                  ) : (
                    <>
                      Madde referanslı yapay zekâ asistanı,
                      <br />
                      <span style={{ color: SAGE_MUTED }}>7/24 cebinizde.</span>
                    </>
                  )}
                </h2>
              </div>
            );
          })()}

          {/* Interactive Split Layout: Phone Mockup on Left + Content Cards on Right */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "48px",
              width: "100%",
              padding: "0 60px",
            }}
          >
            {/* Phone with Smooth Cross-Dissolve: AI Chat 5.jpeg -> DÖF Report 8.jpeg */}
            {(() => {
              const dofDissolve = interpolate(frame, [558, 566], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <CleanPhone
                  currentSrc={staticFile("assets/isgcep/5.jpeg")}
                  nextSrc={staticFile("assets/isgcep/8.jpeg")}
                  dissolveProgress={dofDissolve}
                  width={350}
                  height={760}
                />
              );
            })()}

            {/* Right Side Editorial Showcase Cards */}
            <div
              style={{
                width: "480px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {frame < 560 ? (
                // AI Question & Answer Minimal Cards
                <>
                  {/* User Question Card */}
                  {(() => {
                    const uSpring = spring({
                      frame: Math.max(0, frame - 375),
                      fps,
                      config: { damping: 16, stiffness: 160 },
                    });
                    return (
                      <div
                        style={{
                          transform: `translateY(${(1 - uSpring) * 25}px)`,
                          opacity: uSpring,
                          backgroundColor: CARD_BG,
                          borderRadius: "22px",
                          border: CARD_BORDER,
                          boxShadow: CARD_SHADOW,
                          padding: "24px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: SAGE_MUTED,
                            marginBottom: "6px",
                          }}
                        >
                          Soru
                        </div>
                        <div
                          style={{
                            fontSize: "19px",
                            fontWeight: 700,
                            color: INK_DARK,
                            lineHeight: "1.4",
                          }}
                        >
                          "İşyerlerinde risk değerlendirmesi kaç yılda bir
                          yenilenmeli?"
                        </div>
                      </div>
                    );
                  })()}

                  {/* AI Response Card */}
                  {frame >= 405 &&
                    (() => {
                      const aiSpring = spring({
                        frame: Math.max(0, frame - 405),
                        fps,
                        config: { damping: 16, stiffness: 160 },
                      });
                      return (
                        <div
                          style={{
                            transform: `translateY(${(1 - aiSpring) * 25}px)`,
                            opacity: aiSpring,
                            backgroundColor: CARD_BG,
                            borderRadius: "22px",
                            border: CARD_BORDER,
                            boxShadow: CARD_SHADOW,
                            padding: "26px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "14px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "15px",
                                fontWeight: 800,
                                color: ISG_NAVY,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              İSG AI Asistanı
                            </span>
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: 600,
                                color: SAGE_MUTED,
                              }}
                            >
                              6331 Kanun Madde 10
                            </span>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              backgroundColor: "#F7FAF9",
                              borderRadius: "14px",
                              padding: "16px 20px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "16px",
                                color: INK_DARK,
                                fontWeight: 600,
                              }}
                            >
                              • Çok Tehlikeli Sınıf: <strong>2 Yılda Bir</strong>
                            </div>
                            <div
                              style={{
                                fontSize: "16px",
                                color: INK_DARK,
                                fontWeight: 600,
                              }}
                            >
                              • Tehlikeli Sınıf: <strong>4 Yılda Bir</strong>
                            </div>
                            <div
                              style={{
                                fontSize: "16px",
                                color: INK_DARK,
                                fontWeight: 600,
                              }}
                            >
                              • Az Tehlikeli Sınıf: <strong>6 Yılda Bir</strong>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                </>
              ) : (
                // DÖF Report Card
                <>
                  {(() => {
                    const dofSpring = spring({
                      frame: Math.max(0, frame - 565),
                      fps,
                      config: { damping: 16, stiffness: 160 },
                    });
                    return (
                      <div
                        style={{
                          transform: `translateY(${(1 - dofSpring) * 25}px)`,
                          opacity: dofSpring,
                          backgroundColor: CARD_BG,
                          borderRadius: "24px",
                          border: CARD_BORDER,
                          boxShadow: CARD_SHADOW,
                          padding: "28px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: SAGE_MUTED,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            marginBottom: "8px",
                          }}
                        >
                          Otomatik Raporlama
                        </div>
                        <div
                          style={{
                            fontSize: "22px",
                            fontWeight: 800,
                            color: INK_DARK,
                            marginBottom: "6px",
                          }}
                        >
                          DÖF & Kök Neden Analizi
                        </div>
                        <div
                          style={{
                            fontSize: "15px",
                            color: SUBTLE_TEXT,
                            marginBottom: "20px",
                            lineHeight: "1.4",
                          }}
                        >
                          Mevzuat standartlarına tam uyumlu, resmi formatta PDF
                          çıktısı
                        </div>

                        {/* Flat Minimalist Action Button */}
                        <div
                          style={{
                            backgroundColor: INK_DARK,
                            borderRadius: "14px",
                            padding: "16px 22px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "14px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: 700,
                              color: "#FFFFFF",
                            }}
                          >
                            PDF İndir ve Paylaş
                          </span>
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#94A3B8",
                            }}
                          >
                            Standart Format
                          </span>
                        </div>

                        <div
                          style={{
                            fontSize: "14px",
                            color: SAGE_MUTED,
                            fontWeight: 600,
                          }}
                        >
                          ✓ OSGB ve şirket yetkililerine anında dijital iletim
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 5: PURE VECTOR REDRAW SVG LOGO OUTRO (Frames 770 - 1005, 25.8s - 33.5s) */}
      {/* Voice: "İSG CEP. Güvenli iş yerleri için akıllı çözüm. Şimdi ücretsiz indirin." */}
      {/* ========================================================================= */}
      {frame >= 768 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 30,
            opacity: interpolate(frame, [768, 782], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {/* Logo Container on Light Neutral Canvas */}
          <div style={{ position: "relative", marginBottom: "28px" }}>
            {(() => {
              // 1. Pure Outline Stroke Draw Progress (Frames 775 - 812)
              const strokeDrawProgress = interpolate(frame, [775, 814], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.2, 0, 0, 1),
              });

              // 2. Solid Fill Fade-In (Frames 812 - 828)
              const fillOpacity = interpolate(frame, [812, 828], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              });

              // 3. Orange Helmet Smooth Spring Drop (Frames 808 - 835)
              const helmetSpring = spring({
                frame: Math.max(0, frame - 808),
                fps,
                config: { damping: 14, stiffness: 180 },
              });

              // 4. Underline Draw Progress (Frames 820 - 838)
              const underlineProgress = interpolate(frame, [820, 838], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              // 5. 'CEP' Subtitle Fade & Glide (Frames 828 - 845)
              const cepSpring = spring({
                frame: Math.max(0, frame - 828),
                fps,
                config: { damping: 16, stiffness: 180 },
              });

              // Path evolutions for stroke animation
              const evolvedIS = evolvePath(strokeDrawProgress, PATH_IS_SHAPE);
              const evolvedDot = evolvePath(strokeDrawProgress, PATH_I_DOT);
              const evolvedG = evolvePath(strokeDrawProgress, PATH_G_OUTER);
              const evolvedUnderline = evolvePath(underlineProgress, PATH_UNDERLINE);

              return (
                <div
                  style={{
                    position: "relative",
                    width: "450px",
                    height: "310px",
                  }}
                >
                  <svg
                    viewBox="0 0 1479 1024"
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "visible",
                    }}
                  >
                    {/* 1. Navy Letters 'İ' and 'S' (Starts as pure stroke line, then washes into solid fill) */}
                    <path
                      d={PATH_IS_SHAPE}
                      fill={ISG_NAVY}
                      fillOpacity={fillOpacity}
                      stroke={ISG_NAVY}
                      strokeWidth={12}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={evolvedIS.strokeDasharray}
                      strokeDashoffset={evolvedIS.strokeDashoffset}
                    />

                    {/* 2. Navy Dot of 'İ' */}
                    <path
                      d={PATH_I_DOT}
                      fill={ISG_NAVY}
                      fillOpacity={fillOpacity}
                      stroke={ISG_NAVY}
                      strokeWidth={12}
                      strokeDasharray={evolvedDot.strokeDasharray}
                      strokeDashoffset={evolvedDot.strokeDashoffset}
                    />

                    {/* 3. Outer Navy 'G' */}
                    <path
                      d={PATH_G_OUTER}
                      fill={ISG_NAVY}
                      fillOpacity={fillOpacity}
                      stroke={ISG_NAVY}
                      strokeWidth={12}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={evolvedG.strokeDasharray}
                      strokeDashoffset={evolvedG.strokeDashoffset}
                    />

                    {/* 4. Iconic Safety Helmet in Warm Orange (Drops smoothly into position) */}
                    {frame >= 808 && (
                      <g
                        transform={`translate(0, ${(1 - helmetSpring) * -65}) scale(${
                          0.9 + helmetSpring * 0.1
                        })`}
                        style={{ transformOrigin: "1100px 450px" }}
                        opacity={helmetSpring}
                      >
                        <path d={PATH_HELMET_ORANGE} fill={ISG_ORANGE} />
                      </g>
                    )}

                    {/* 5. Goggles in Navy inside Helmet */}
                    {frame >= 816 && (
                      <path
                        d={PATH_GOGGLES_NAVY}
                        fill={ISG_NAVY}
                        opacity={interpolate(frame, [816, 828], [0, 1], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        })}
                      />
                    )}

                    {/* 6. Underline Bar (Draws smoothly left to right) */}
                    {frame >= 820 && (
                      <path
                        d={PATH_UNDERLINE}
                        fill={ISG_NAVY}
                        fillOpacity={interpolate(frame, [824, 836], [0, 1], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        })}
                        stroke={ISG_NAVY}
                        strokeWidth={6}
                        strokeDasharray={evolvedUnderline.strokeDasharray}
                        strokeDashoffset={evolvedUnderline.strokeDashoffset}
                      />
                    )}

                    {/* 7. Bottom Letters 'C', 'E', 'P' (Gentle fade in with soft tracking) */}
                    {frame >= 828 && (
                      <g
                        style={{
                          opacity: cepSpring,
                          transform: `translateY(${(1 - cepSpring) * 12}px)`,
                        }}
                      >
                        <path d={PATH_LETTER_C} fill={ISG_NAVY} />
                        <path d={PATH_LETTER_E} fill={ISG_NAVY} />
                        <path d={PATH_LETTER_P} fill={ISG_NAVY} />
                      </g>
                    )}
                  </svg>
                </div>
              );
            })()}
          </div>

          {/* Slogan (Pure Ink `#0F2A2E`, NO gradient) */}
          {(() => {
            const textSpring = spring({
              frame: Math.max(0, frame - 825),
              fps,
              config: { damping: 16, stiffness: 160 },
            });
            return (
              <div
                style={{
                  transform: `translateY(${(1 - textSpring) * 20}px)`,
                  opacity: textSpring,
                  textAlign: "center",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: INK_DARK,
                  }}
                >
                  Güvenli iş yerleri için akıllı çözüm.
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    color: SUBTLE_TEXT,
                    marginTop: "8px",
                    fontWeight: 500,
                  }}
                >
                  6331 sayılı kanun uyumlu mobil İSG platformu
                </div>
              </div>
            );
          })()}

          {/* Clean Minimalist Store Badges (White cards on light background) */}
          {(() => {
            const bSpring = spring({
              frame: Math.max(0, frame - 840),
              fps,
              config: { damping: 16, stiffness: 160 },
            });
            return (
              <div
                style={{
                  transform: `translateY(${(1 - bSpring) * 20}px)`,
                  opacity: bSpring,
                  display: "flex",
                  gap: "18px",
                  marginBottom: "36px",
                }}
              >
                {/* App Store Card */}
                <div
                  style={{
                    backgroundColor: CARD_BG,
                    border: CARD_BORDER,
                    borderRadius: "16px",
                    padding: "12px 24px",
                    boxShadow: "0 10px 25px rgba(15, 42, 46, 0.04)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: SAGE_MUTED,
                      fontWeight: 600,
                    }}
                  >
                    Download on the
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      color: INK_DARK,
                      fontWeight: 700,
                    }}
                  >
                    App Store
                  </div>
                </div>

                {/* Google Play Card */}
                <div
                  style={{
                    backgroundColor: CARD_BG,
                    border: CARD_BORDER,
                    borderRadius: "16px",
                    padding: "12px 24px",
                    boxShadow: "0 10px 25px rgba(15, 42, 46, 0.04)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: SAGE_MUTED,
                      fontWeight: 600,
                    }}
                  >
                    GET IT ON
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      color: INK_DARK,
                      fontWeight: 700,
                    }}
                  >
                    Google Play
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Clean Action Button (Solid Ink `#0F2A2E`, generous padding, NO glow) */}
          {(() => {
            const ctaSpring = spring({
              frame: Math.max(0, frame - 855),
              fps,
              config: { damping: 16, stiffness: 180 },
            });
            return (
              <div
                style={{
                  transform: `translateY(${(1 - ctaSpring) * 20}px)`,
                  opacity: ctaSpring,
                  backgroundColor: INK_DARK,
                  borderRadius: "20px",
                  padding: "18px 46px",
                  boxShadow: "0 15px 35px rgba(15, 42, 46, 0.12)",
                }}
              >
                <span
                  style={{
                    color: "#FFFFFF",
                    fontSize: "20px",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Hemen Ücretsiz İndirin · isgcep.com
                </span>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
