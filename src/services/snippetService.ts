import { FileType } from "../types/FileType";
import { Rule } from "../types/Rule";
import { TestCase } from "../types/TestCase";
import { TestCaseResult } from "../utils/queries";
import { PaginatedSnippets, CreateSnippet, Snippet, UpdateSnippet } from "../utils/snippet";
import { SnippetOperations } from "../utils/snippetOperations";
import { PaginatedUsers } from "../utils/users";
import api from "./api";

export class SnippetService implements SnippetOperations {
    async listSnippetDescriptors(page: number, pageSize: number, snippetName?: string | undefined): Promise<PaginatedSnippets> {
        return (await api.get(`snippets?page=${page}&pageSize=${pageSize}&param=${snippetName}`)).data;
    }

    async createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        return await api.post('snippets', {
            name: createSnippet.name,
            language: createSnippet.language,
            snippet: createSnippet.content,
        });
    }

    async getSnippetById(id: string): Promise<Snippet | undefined> {
        return (await api.get(`snippets/${id}`)).data;
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        throw new Error("Method not implemented.");
    }

    getUserFriends(name?: string | undefined, page?: number | undefined, pageSize?: number | undefined): Promise<PaginatedUsers> {
        throw new Error("Method not implemented.");
    }

    shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        throw new Error("Method not implemented.");
    }

    getFormatRules(): Promise<Rule[]> {
        throw new Error("Method not implemented.");
    }

    getLintingRules(): Promise<Rule[]> {
        throw new Error("Method not implemented.");
    }

    getTestCases(): Promise<TestCase[]> {
        throw new Error("Method not implemented.");
    }

    formatSnippet(snippet: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async postTestCase(testCase: Partial<TestCase>): Promise<TestCase> {
        return (await api.post(`tests/${testCase.id}`, {
            name: testCase.name,
            inputs: testCase.input,
            outputs: testCase.output,
        })).data;
    }

    removeTestCase(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    deleteSnippet(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        throw new Error("Method not implemented.");
    }

    async getFileTypes(): Promise<FileType[]> {
        return (await api.get('snippets/languages')).data;
    }

    modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        throw new Error("Method not implemented.");
    }

    modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        throw new Error("Method not implemented.");
    }

}