#!/bin/bash
# startbot.sh

SESSION="mybot"
DIR="/root/rebotesm"
LOG="$DIR/bot.log"

cd $DIR

# Kill existing session
screen -S $SESSION -X quit 2>/dev/null

# Start new session dengan auto-restart
screen -dmS $SESSION bash -c "
while true; do
echo '\$(date): Starting bot...' >> $LOG
node index.js 2>&1 >> $LOG
echo '\$(date): Bot crashed. Restarting in 10s...' >> $LOG
sleep 10
done
"

echo "🤖 Bot started in screen session: $SESSION"
echo "📋 Check logs: tail -f $LOG"
echo "🎮 Attach to session: screen -r $SESSION"


#botstart     Start bot
#botstatus    Cek status  
#botlog       Lihat logs
#botstop      Stop bot