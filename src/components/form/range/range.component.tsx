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
    };
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function RangeInput({ data, handleChange }: IProps) {
    const rangeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (rangeRef.current !== null) {
            const valueToMove = ((parseInt(data.value) - data.min) * 100) / (data.max - data.min);

            rangeRef.current.style.backgroundSize = `${valueToMove}%`;
        }
    }, [rangeRef, data.value, data.min, data.max]);

    return (
        <div className="flex flex-wrap gap-3">
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
                ref={rangeRef}
            />
            <span className="min flex-1 text-sm">
                {data.symbol} {data.min}
            </span>
            <span className="max flex-1 text-sm text-right">
                {data.symbol} {data.value}
            </span>
        </div>
    );
}
