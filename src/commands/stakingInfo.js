const Extra = require('telegraf/extra');

module.exports = () => {
  return async ctx => {
    const { helpers, message, replyWithMarkdown, state } = ctx;
    const { inReplyTo } = Extra;
    const { getWeb3 } = helpers;
    const { args } = state.command;

    const network = args[0] ? args[0].toLowerCase() : 'polkadot';
    const web3 = getWeb3(network);

    const [validatorCount, minValidatorCount] = await Promise.all([
      web3.query.staking.validatorCount(),
      web3.query.staking.minimumValidatorCount(),
    ]);

    let msg = '';
    msg = msg.concat(
      `Sessions Per Era: \`${web3.consts.staking.sessionsPerEra.toHuman()}\`\n`,
      `Bonding Duration: \`${web3.consts.staking.bondingDuration.toHuman()} days\``,
      `Validator Count: \`${validatorCount.toHuman()}\``,
      `Minimum Validator Count: \`${minValidatorCount.toHuman()}\``,
    );

    replyWithMarkdown(msg, inReplyTo(message.message_id));
  };
};