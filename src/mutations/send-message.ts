import { gql } from "@apollo/client";

const MUTATE_MESSAGE = gql`
    mutation SendMessage($data: MessageModel) {
        sendMessage(data: $data)
    }
`;

export default MUTATE_MESSAGE;