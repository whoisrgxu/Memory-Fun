import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import styles from "@/styles/Home.module.css";


export default function NumCard({num}) {

    return (
        <Card className="styles.card">

            <div className={`${styles.numberContainer} mt-5 mb-5`}>
                <span>{num}</span>
            </div>
        </Card>
    )
}