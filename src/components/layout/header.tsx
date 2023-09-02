import React from 'react'

interface HeaderProps {
  title: String
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    width: '100%',
    marginBottom: '15px'
  },
};

const Header:React.FC<HeaderProps> = ({ title }) => {

  return (
    <div style={styles.header}>
			<h1>{title}</h1>
    </div>
  )

}

export default Header;