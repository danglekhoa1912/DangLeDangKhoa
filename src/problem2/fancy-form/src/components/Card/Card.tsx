import React from "react";
import './Card.css';


interface CardProps {
  children: React.ReactNode;
}

export default function Card(props: CardProps) {
  const { children } = props;
  return <div className="card" >{children}</div>;
}
