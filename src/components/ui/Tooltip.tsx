"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface CustomTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right" | "auto";
  delay?: number;
  className?: string;
}

export default function CustomTooltip({ 
  content, 
  children, 
  position = "auto", 
  delay = 500,
  className = "" 
}: CustomTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [actualPosition, setActualPosition] = useState<"top" | "bottom" | "left" | "right">("top");
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = 280; // Max width
    const tooltipHeight = 60; // Estimated height
    const margin = 10;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalPosition = position === "auto" ? "top" : position;
    let x = 0;
    let y = 0;

    // Auto positioning logic
    if (position === "auto") {
      const canFitTop = triggerRect.top - tooltipHeight - margin > 0;
      const canFitBottom = triggerRect.bottom + tooltipHeight + margin < viewportHeight;
      const canFitLeft = triggerRect.left - tooltipWidth - margin > 0;
      const canFitRight = triggerRect.right + tooltipWidth + margin < viewportWidth;

      if (canFitTop) {
        finalPosition = "top";
      } else if (canFitBottom) {
        finalPosition = "bottom";
      } else if (canFitRight) {
        finalPosition = "right";
      } else if (canFitLeft) {
        finalPosition = "left";
      } else {
        finalPosition = "bottom"; // Fallback
      }
    }

    // Calculate coordinates based on final position
    switch (finalPosition) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.top - margin;
        break;
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2;
        y = triggerRect.bottom + margin;
        break;
      case "left":
        x = triggerRect.left - margin;
        y = triggerRect.top + triggerRect.height / 2;
        break;
      case "right":
        x = triggerRect.right + margin;
        y = triggerRect.top + triggerRect.height / 2;
        break;
    }

    // Ensure tooltip stays within viewport
    if (finalPosition === "top" || finalPosition === "bottom") {
      x = Math.max(margin, Math.min(x, viewportWidth - tooltipWidth - margin));
    } else {
      y = Math.max(margin, Math.min(y, viewportHeight - tooltipHeight - margin));
    }

    setTooltipPosition({ x, y });
    setActualPosition(finalPosition);
  };

  const showTooltip = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      calculatePosition();
      setShouldShow(true);
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
    setTimeout(() => setShouldShow(false), 150);
  };

  useEffect(() => {
    const handleResize = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    const handleScroll = () => {
      if (isVisible) {
        calculatePosition();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  const getTooltipStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'fixed',
      left: tooltipPosition.x,
      top: tooltipPosition.y,
      maxWidth: '280px',
      zIndex: 9999,
      pointerEvents: 'none',
    };

    switch (actualPosition) {
      case "top":
        return {
          ...baseStyle,
          transform: 'translate(-50%, -100%)',
        };
      case "bottom":
        return {
          ...baseStyle,
          transform: 'translate(-50%, 0)',
        };
      case "left":
        return {
          ...baseStyle,
          transform: 'translate(-100%, -50%)',
        };
      case "right":
        return {
          ...baseStyle,
          transform: 'translate(0, -50%)',
        };
      default:
        return baseStyle;
    }
  };

  const getArrowStyle = () => {
    const arrowSize = 4;
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
    };

    switch (actualPosition) {
      case "top":
        return {
          ...baseStyle,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderTop: `${arrowSize}px solid rgb(17, 24, 39)`, // gray-900
        };
      case "bottom":
        return {
          ...baseStyle,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid rgb(17, 24, 39)`,
        };
      case "left":
        return {
          ...baseStyle,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderLeft: `${arrowSize}px solid rgb(17, 24, 39)`,
        };
      case "right":
        return {
          ...baseStyle,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid rgb(17, 24, 39)`,
        };
      default:
        return baseStyle;
    }
  };

  const tooltipElement = shouldShow ? (
    <div
      ref={tooltipRef}
      style={getTooltipStyle()}
      className={`
        px-3 py-2 text-sm font-medium text-white 
        bg-gray-900 rounded-lg shadow-xl
        transition-all duration-150 ease-out
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
      `}
    >
      {content}
      <div style={getArrowStyle()} />
    </div>
  ) : null;

  return (
    <>
      <div 
        ref={triggerRef}
        className={`relative inline-block ${className}`}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>
      {typeof document !== 'undefined' && tooltipElement && 
        createPortal(tooltipElement, document.body)
      }
    </>
  );
} 