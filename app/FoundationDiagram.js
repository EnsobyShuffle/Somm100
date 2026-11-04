'use client';
import React from 'react';
import {renderFoundationDiagram} from '../lib/foundation-diagrams.mjs';
import './foundation-study.css';

export default function FoundationDiagram({unitId}) {
  return renderFoundationDiagram(React.createElement, unitId);
}
