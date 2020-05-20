'use strict';

module.exports = {
    Conversation: {
        hasMany: {
            ConversationIdForeignIdxes: {
                as: "'messages'"
            }
        },
        attributes: {
            meta: {
                default: "{}"
            }
        },
    }
};
