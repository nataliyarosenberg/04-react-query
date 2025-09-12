import { useState } from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

interface SearchBarProps {
    onSubmit: (searchValue: string) => void;

}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const [inputValue, setInputValue] = useState('');
   
    const handleSubmit = (formData: FormData) => {
        const query = formData.get("query") as string;
        
        if (query.trim() === "") {
          toast.error("Please enter your search query.");
          return;
        } 
        onSubmit(query.trim());
        setInputValue('');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       setInputValue(event.target.value); 
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={styles.form} action={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        value={inputValue}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={styles.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
}