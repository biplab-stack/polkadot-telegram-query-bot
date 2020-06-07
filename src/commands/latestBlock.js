const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { getWeb3 } = helpers;
    const { args } = state.command;

    const network = args[0] ? args[0].toLowerCase() : 'polkadot';
    const web3 = getWeb3(network);
    const lastHeader = await web3.rpc.chain.getHeader();
    const header = await web3.derive.chain.getHeader(lastHeader.hash);

    let msg = '';
    msg = msg.concat(
      `Latest Block #: \`${lastHeader.number}\`\n`,
      `Hash: \`${lastHeader.hash}\`\n`,
      `Author: \`${header.author}\``,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};