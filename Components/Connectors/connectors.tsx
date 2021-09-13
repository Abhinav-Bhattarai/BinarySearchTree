import React from 'react'
import styles from '../../styles/node.module.scss';

const Connectors: React.FC<{rotation: string}> = ({ rotation }) => {
    return (
        <React.Fragment>
            <main id={styles.ConnectorContainer} style={{
                transform: `rotate(${rotation}) translateY(160px)`
            }}>

            </main>
        </React.Fragment>
    )
}

export default Connectors;
