import request from "request";

let playerCount = 0;

class SendPlayerNotification {

    public enable: boolean = true;


    public notifyPlayerConnected = (output: string) => {
        if (!this.enable) {
            return;
        }


        // Regular expression to match the name in square brackets
        const joinReg = /\[.*?\]: (.+?) joined the game/;
        const leftReg = /\[.*?\]: (.+?) left the game/;

        // Use the exec() method to extract the name
        const joinMatch = joinReg.exec(output);
        const leftMatch = leftReg.exec(output);
        let playerName = '';

        if (joinMatch) {
            playerCount++;
            playerName = joinMatch[1];
            request({
                url: "http://localhost:3001/minecraft-join",
                method: "POST",
                json: true,
                body: {
                    "player_name": playerName
                }
            }, function (error, response, _){
                console.log(response);
            });
            if (playerCount === 3) {
                request({
                    url: "http://localhost:3001/minecraft-2bum",
                    method: "POST",
                    json: true,
                    body: {
                        "player_name": playerName
                    }
                }, function (error, response, _){
                    console.log(response);
                });
            }
        } else if (leftMatch) {
            playerName = leftMatch[1];
            playerCount--;
            request({
                url: "http://localhost:3001/minecraft-left",
                method: "POST",
                json: true,
                body: {
                    "player_name": playerName
                }
            }, function (error, response, _){
                console.log(response);
            });
        }

    }
}

export default new SendPlayerNotification();
