import './Search2.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LuSearch } from "react-icons/lu";

function Search2() {
    const inputRef = useRef<HTMLInputElement>(null)
    const searchRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const openSearch = useCallback(() => {
        setIsClosing(false)
        setIsOpen(true)
    }, [])

    const closeSearch = useCallback(() => {
        setIsOpen(false)
        setIsClosing(true)
    }, [])

    useEffect(() => {
        if (isOpen) inputRef.current?.focus()
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return

        const handlePointerDown = (e: PointerEvent) => {
            if (!searchRef.current?.contains(e.target as Node)) {
                closeSearch()
            }
        }

        document.addEventListener('pointerdown', handlePointerDown)
        return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [closeSearch, isOpen])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeSearch()
                return
            }

            if (e.key !== '/') return

            const target = e.target as HTMLElement
            const isTyping =
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable
            if (isTyping) return

            e.preventDefault()
            openSearch()
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [closeSearch, isOpen, openSearch])

    return (
        <>
            <div className="Search2" onClick={openSearch}>
                <LuSearch className="SearchIcon" />
            </div>
            {(isOpen || isClosing) && createPortal(
                <>
                    <div
                        className={`Search2Overlay${isClosing ? ' closing' : ''}`}
                        onClick={closeSearch}
                        onAnimationEnd={(e) => {
                            if (e.target === e.currentTarget && isClosing) {
                                setIsClosing(false)
                            }
                        }}
                    />
                    <div
                        ref={searchRef}
                        className={`Search2 open${isClosing ? ' closing' : ''}`}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Search"
                    >
                        <LuSearch className="SearchIcon" />
                        <input
                            ref={inputRef}
                            type="search"
                            name="Search"
                            placeholder="Search..."
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        {value.length === 0 && <div className="ShorcutKey">/</div>}
                    </div>
                </>,
                document.body
            )}
        </>
    )
}

export default Search2