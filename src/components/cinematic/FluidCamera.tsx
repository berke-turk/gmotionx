import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CameraMoveConfig {
  zoom?: number;         // 1.0 = normal, 1.2 = zoom in
  panX?: number;         // pixels to shift horizontally
  panY?: number;         // pixels to shift vertically
  rotateZ?: number;      // degrees of camera tilt/roll (-5 to 5 typical)
  rotateX?: number;      // degrees of camera pitch (3D angle)
  rotateY?: number;      // degrees of camera yaw (3D angle)
  enableMicroDrift?: boolean; // Organic handheld camera drift
}

export interface FluidCameraProps {
  children: React.ReactNode;
  move?: CameraMoveConfig;
  springConfig?: { damping?: number; mass?: number; stiffness?: number };
}

/**
 * FluidCamera: Remotion için pürüzsüz sanal kamera sistemi.
 * Dolly-in, pan, tilt, 3D pitch/yaw ve organik el kamerası mikro-titremesini (micro-drift)
 * tek bir akıcı matriste birleştirir.
 */
export const FluidCamera: React.FC<FluidCameraProps> = ({
  children,
  move = {},
  springConfig = { damping: 14, mass: 0.8, stiffness: 90 },
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const targetZoom = move.zoom ?? 1.06;
  const targetPanX = move.panX ?? 0;
  const targetPanY = move.panY ?? 0;
  const targetRotateZ = move.rotateZ ?? 0;
  const targetRotateX = move.rotateX ?? 0;
  const targetRotateY = move.rotateY ?? 0;
  const enableDrift = move.enableMicroDrift ?? true;

  // Akıcı kamera yaylanması (Camera easing spring)
  const cameraSpring = spring({
    frame,
    fps,
    config: springConfig,
  });

  // Kamera parametrelerinin interpolasyonu (Zarif sinematik açı aralıkları)
  const currentZoom = interpolate(cameraSpring, [0, 1], [1.0, targetZoom]);
  const currentPanX = interpolate(cameraSpring, [0, 1], [0, targetPanX]);
  const currentPanY = interpolate(cameraSpring, [0, 1], [0, targetPanY]);
  const currentRotateZ = interpolate(cameraSpring, [0, 1], [0, targetRotateZ * 0.6]);
  const currentRotateX = interpolate(cameraSpring, [0, 1], [0, targetRotateX * 0.3]);
  const currentRotateY = interpolate(cameraSpring, [0, 1], [0, targetRotateY * 0.3]);

  // Organik mikro-drift (canlı, nefes alan sinematik his)
  const driftX = enableDrift ? Math.sin(frame * 0.04) * 4.5 + Math.cos(frame * 0.02) * 2.5 : 0;
  const driftY = enableDrift ? Math.cos(frame * 0.035) * 5.0 + Math.sin(frame * 0.015) * 2.0 : 0;
  const driftRotate = enableDrift ? Math.sin(frame * 0.025) * 0.45 : 0;

  const totalPanX = currentPanX + driftX;
  const totalPanY = currentPanY + driftY;
  const totalRotateZ = currentRotateZ + driftRotate;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        perspective: "1200px",
        perspectiveOrigin: "center center",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          transformOrigin: "center center",
          transform: `translate3d(${totalPanX}px, ${totalPanY}px, 0px) scale(${currentZoom}) rotateZ(${totalRotateZ}deg) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};
