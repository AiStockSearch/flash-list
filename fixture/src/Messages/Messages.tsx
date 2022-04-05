import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";

import MessageType from "./models/MessageType";
import initialMessages from "./data/messages";
import TextInputBar from "./TextInputBar";
import userName from "./userName";
import MessageItem from "./MessageItem";
import Message from "./models/Message";

const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);

  const appendMessage = (text: string) => {
    const message = {
      text,
      sender: userName,
      type: MessageType.Text,
    } as Message;
    setMessages([message, ...messages]);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={styles.keyboardAvoidingViewStyles}
    >
      <FlashList
        renderItem={MessageItem}
        inverted
        estimatedItemSize={100}
        overrideItemLayout={(layout, item) => {
          switch (item.type) {
            case MessageType.Text:
              layout.size = 100;
              break;
            case MessageType.Image:
              layout.size = 200;
              break;
          }
        }}
        overrideItemType={(item) => {
          return item.type;
        }}
        data={messages}
      />
      <TextInputBar
        onSend={(text) => {
          appendMessage(text);
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingViewStyles: {
    flex: 1,
    marginBottom: 40,
    backgroundColor: "white",
  },
});

export default Messages;
