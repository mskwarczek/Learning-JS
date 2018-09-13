import React from 'react';

import styles from './MessageList.css';

const OwnerOptions = props => (
        <button className={styles.MessageDeleteButton} onClick={() => props.delete(props.id)}>X</button>
        // Possibly there could be more options, like "edit"
);

const Message = props => (
    <div className={styles.Message}>
        <strong>{props.from}</strong>
        <span> ({props.time}): {props.text}</span>
        {
            props.activeUser === props.from ? 
                <OwnerOptions 
                    id={props.id}
                    from={props.from}
                    delete={props.delete}
                /> : '' // Possibly there could be other set of options, like "report" or "like"
        }
    </div>
);

const MessageList = props => (
    <div className={styles.MessageList}>
        {   
            props.messages.map((message) => {
                return (
                    <Message
                        key={message.id}
                        id={message.id}
                        from={message.from}
                        text={message.text}
                        time={message.time}
                        delete={props.delete}
                        activeUser={props.activeUser}
                    />
                );
            })
        }
    </div>
);

export default MessageList;