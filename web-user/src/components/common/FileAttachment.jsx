import styles from "../../styles/components/common/FileAttachment.module.css";

export default function FileAttachment({ files = [], onRemove, onAdd }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>ATTACHMENTS (OPTIONAL)</div>
      <div className={styles.fileList}>
        {files.map(file => (
          <div key={file.name} className={styles.fileItem}>
            <span>{file.name}</span>
            <span className={styles.fileSize}>{file.size}</span>
            <button onClick={() => onRemove(file)}>🗑️</button>
          </div>
        ))}
      </div>
      <button className={styles.addButton} onClick={onAdd}>+ Add File</button>
    </div>
  );
}