### Required

Install Node
Install Expo
Install Tailwind

```npm install tailwindcss@3.3.2 --save-dev```

Install Nativewind

### Commands

```npx expo start -c```
```npx expo start --tunnel```
```npx expo start --port 19000```

### Debugging

Fix Firewall Issue
```sudo ufw status verbose```
```sudo ufw allow 19000/tcp```

Checking Ports
```sudo lsof -i -P -n | grep LISTEN```

Checking Specific Port
```sudo lsof -i :8081```