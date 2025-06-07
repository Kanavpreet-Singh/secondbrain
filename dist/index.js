"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const port = 3000;
const zod_1 = __importDefault(require("zod"));
app.use(express_1.default.json());
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWT_SECRET = "nfknfknefkne";
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameSchema = zod_1.default.string().min(3).max(20);
    const passwordSchema = zod_1.default.string().min(2).max(20);
    const usernameValidation = usernameSchema.safeParse(req.body.username);
    const passwordValidation = passwordSchema.safeParse(req.body.password);
    if (!usernameValidation.success) {
        res.status(400).json({ error: "Invalid username" });
        return;
    }
    if (!passwordValidation.success) {
        res.status(400).json({ error: "Invalid password" });
        return;
    }
    const username = req.body.username;
    const password = req.body.password;
    let user = yield db_1.User.findOne({ username: username });
    if (user) {
        res.status(400).json({ error: "Username already exists" });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    let u = yield db_1.User.insertOne({
        username: username, password: hashedPassword
    });
    res.status(201).json({ message: "User created successfully" });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield db_1.User.findOne({ username });
    if (!user) {
        res.status(400).json({ error: "Invalid username or password" });
        return;
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(400).json({ error: "Invalid username or password" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ username: user.username }, JWT_SECRET);
    res.status(200).json({ token });
    return;
}));
app.get("/api/v1/content", (req, res) => {
});
app.delete("/api/v1/content", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
