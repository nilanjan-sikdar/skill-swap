
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Github, Wallet, Link, CheckCircle, AlertCircle } from "lucide-react";

const accounts = [
  {
    id: "github",
    name: "GitHub",
    description: "Connect your GitHub account to showcase your repositories",
    icon: Github,
    connected: true,
    username: "@johndoe",
    color: "bg-gray-900 text-white"
  },
  {
    id: "wallet",
    name: "Web3 Wallet",
    description: "Connect your crypto wallet for Web3 features",
    icon: Wallet,
    connected: false,
    username: null,
    color: "bg-orange-500 text-white"
  },
  {
    id: "portfolio",
    name: "Portfolio Site",
    description: "Link your personal portfolio or website",
    icon: Link,
    connected: true,
    username: "johndoe.dev",
    color: "bg-blue-500 text-white"
  }
];

export const ConnectedAccounts = () => {
  const handleConnect = (accountId: string) => {
    console.log("Connecting account:", accountId);
    // Handle account connection
  };

  const handleDisconnect = (accountId: string) => {
    console.log("Disconnecting account:", accountId);
    // Handle account disconnection
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {accounts.map((account, index) => {
        const Icon = account.icon;
        
        return (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-3 rounded-lg ${account.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{account.name}</h3>
                        {account.connected ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-orange-200 text-orange-800">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Not Connected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {account.description}
                      </p>
                      {account.connected && account.username && (
                        <p className="text-sm font-medium text-primary">
                          {account.username}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {account.connected ? (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisconnect(account.id)}
                          className="hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                        >
                          Disconnect
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          onClick={() => handleConnect(account.id)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          Connect
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
