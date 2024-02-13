'use client';
import React, { useRef, useEffect } from 'react';
import './range.scss';

interface IProps {
    data: {
        min: number;
        max: number;
        value: string;
        symbol: string;
        name: string;
        symbolPosition: string;
    };
    className?: string;
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
    onMouseUp: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function RangeInput({ data, className, handleChange, onMouseUp }: IProps) {
    const rangeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (rangeRef.current !== null) {
            const valueToMove = ((parseInt(data.value) - data.min) * 100) / (data.max - data.min);

            rangeRef.current.style.backgroundSize = `${valueToMove}%`;
        }
    }, [rangeRef, data.value, data.min, data.max]);

    return (
        <div className={`flex flex-wrap gap-3 ${className || ''}`}>
            <input
                type="range"
                className="slider w-full"
                name={data.name}
                id={data.name}
                min={data.min}
                max={data.max}
                step="50"
                value={data.value}
                onChange={handleChange}
                onMouseUp={onMouseUp}
                ref={rangeRef}
            />
            <span className="min flex-1 text-sm">
                {(!data.symbolPosition || data.symbolPosition === 'left') && data.symbol} {data.min} {data.symbolPosition === 'right' && data.symbol}
            </span>
            <span className="max flex-1 text-sm text-right">
                {(!data.symbolPosition || data.symbolPosition === 'left') && data.symbol} {data.max} {data.symbolPosition === 'right' && data.symbol}
            </span>
        </div>
    );
}
