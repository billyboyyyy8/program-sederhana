"use client"; // Menandai ini sebagai Client Component

import { useState } from 'react';
import styles from './globals.css'; // Pastikan path ini sesuai dengan file CSS Anda

export default function Home() {
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState('');
    const [resultMessage, setResultMessage] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false); // State untuk menampilkan angka yang benar
    const [gameOver, setGameOver] = useState(false); // State untuk menandai game over

    const handleGuess = () => {
        if (gameOver) return; // Jika game over, tidak bisa menebak lagi
        
        const userGuess = Number(guess);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (userGuess === randomNumber) {
            setResultMessage(`Selamat! Anda menebak angka ${randomNumber} dalam ${newAttempts} percobaan.`);
            setShowAnswer(false); // Reset showAnswer jika sudah benar
        } else if (userGuess < randomNumber) {
            setResultMessage('Tebakan Anda terlalu rendah. Coba lagi!');
        } else {
            setResultMessage('Tebakan Anda terlalu tinggi. Coba lagi!');
        }

        // Jika percobaan sudah mencapai 3, tampilkan jawabannya dan nyatakan game over
        if (newAttempts >= 3) {
            setShowAnswer(true);
            setGameOver(true);
            setResultMessage(`Anda gagal! Angka yang benar adalah ${randomNumber}.`);
        }
    };

    const handleRestart = () => {
        setRandomNumber(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setResultMessage('');
        setAttempts(0);
        setShowAnswer(false); // Reset ketika permainan diulang
        setGameOver(false); // Reset status game over
    };

    return (
        <div className={styles.container}>
            <h1>Tebak Angka!</h1>
            <p>Saya telah memilih angka antara 1 hingga 100. Coba tebak!</p>
            <p>Kamu hanya punya 3 kali kesempatan untuk menebak, setelah itu kamu gagal!</p>
            <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Masukkan tebakan Anda"
                className={styles.input}
                disabled={gameOver} // Disable input jika game over
            />
            <button onClick={handleGuess} className={styles.button} disabled={gameOver}>
                Tebak
            </button>
            <p className={styles.result}>{resultMessage}</p>
            
            {/* Jika user telah menebak 3 kali, tampilkan angka yang benar dan game over */}
            {showAnswer && !resultMessage.includes('Selamat') && (
                <p className={styles.result}>Game Over! Jawabannya adalah: {randomNumber}</p>
            )}

            {/* Tombol untuk restart game */}
            {gameOver || resultMessage.includes('Selamat') ? (
                <button onClick={handleRestart} className={styles.restartButton}>Main Lagi</button>
            ) : null}
        </div>
    );
}
