"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../database/connection"));
var TeachersController = /** @class */ (function () {
    function TeachersController() {
    }
    TeachersController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, city, uf, subjects, parsedSubjects, teachers, serializedTeachers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.query, city = _a.city, uf = _a.uf, subjects = _a.subjects;
                        parsedSubjects = String(subjects)
                            .split(',')
                            .map(function (subject) { return Number(subject.trim()); });
                        return [4 /*yield*/, connection_1.default('teachers')
                                .join('teacher_subjects', 'teachers.id', '=', 'teacher_subjects.teacher_id')
                                .whereIn('teacher_subjects.subject_id', parsedSubjects)
                                .where('city', String(city))
                                .where('uf', String(uf))
                                .distinct()
                                .select('teachers.*')];
                    case 1:
                        teachers = _b.sent();
                        serializedTeachers = teachers.map(function (teacher) {
                            return __assign(__assign({}, teacher), { image_url: process.env.APP_URL + "/uploads/" + teacher.image });
                        });
                        return [2 /*return*/, response.json(serializedTeachers)];
                }
            });
        });
    };
    TeachersController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, teacher, serializedTeacher, subjects;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, connection_1.default('teachers').where('id', id).first()];
                    case 1:
                        teacher = _a.sent();
                        if (!teacher) {
                            return [2 /*return*/, response.status(400).json('Teacher not founded')];
                        }
                        serializedTeacher = __assign(__assign({}, teacher), { image_url: process.env.APP_URL + "/uploads/" + teacher.image });
                        return [4 /*yield*/, connection_1.default('subjects')
                                .join('teacher_subjects', 'subjects.id', '=', 'teacher_subjects.subject_id')
                                .where('teacher_subjects.teacher_id', id)
                                .select('subjects.title')];
                    case 2:
                        subjects = _a.sent();
                        return [2 /*return*/, response.json({ teacher: serializedTeacher, subjects: subjects })];
                }
            });
        });
    };
    TeachersController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, age, sex, email, password, latitude, longitude, city, uf, description, subjects, trx, teacher, insertedIds, teacher_id, teacherSubjects;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, name = _a.name, age = _a.age, sex = _a.sex, email = _a.email, password = _a.password, latitude = _a.latitude, longitude = _a.longitude, city = _a.city, uf = _a.uf, description = _a.description, subjects = _a.subjects;
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _b.sent();
                        teacher = {
                            image: request.file.filename,
                            name: name,
                            age: age,
                            sex: sex,
                            email: email,
                            password: password,
                            latitude: latitude,
                            longitude: longitude,
                            city: city,
                            uf: uf,
                            description: description,
                            rate: 5
                        };
                        return [4 /*yield*/, trx('teachers').insert(teacher)];
                    case 2:
                        insertedIds = _b.sent();
                        teacher_id = insertedIds[0];
                        teacherSubjects = subjects
                            .split(',')
                            .map(function (subject) { return Number(subject.trim()); })
                            .map(function (subject_id) {
                            return {
                                subject_id: subject_id,
                                teacher_id: teacher_id,
                            };
                        });
                        return [4 /*yield*/, trx('teacher_subjects').insert(teacherSubjects)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, response.json(__assign({ id: teacher_id }, teacher))];
                }
            });
        });
    };
    return TeachersController;
}());
exports.default = TeachersController;
