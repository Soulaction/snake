import { FC, PropsWithChildren } from 'react'
import styles from './SectionTemplate.module.css'

interface ISectionTemplateProps {
  id: string
  title: string
  isCustomBg?: boolean
}

export const SectionTemplate: FC<PropsWithChildren<ISectionTemplateProps>> = ({
  id,
  title,
  isCustomBg = false,
  children,
}) => {
  return (
    <section
      className={`${isCustomBg && styles['secondary-bg']} ${styles.section}`}
      id={id}>
      <div className={styles.container}>
        <h2 className={styles.heading}>{title}</h2>
        {children}
      </div>
    </section>
  )
}
