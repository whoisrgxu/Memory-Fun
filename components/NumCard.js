import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import styles from "@/styles/Home.module.css";


export default function NumCard({num}) {

    return (
        <Card className="styles.card">
            <div className={styles.imageContainer}>
                <Image 
                    src={`/poker${num}.png`} 
                    alt="Poker"
                    layout="responsive"
                    width={100}
                    height={100}
                />
            </div> 
        </Card>
    )
}