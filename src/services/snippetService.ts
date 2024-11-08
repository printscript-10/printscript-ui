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
        const snippetId = 2;
        return await api.post(`snippets/${snippetId}`, {
            name: createSnippet.name,
            language: createSnippet.language,
            snippet: createSnippet.content,
        });
    }

    async getSnippetById(id: string): Promise<Snippet | undefined> {
        return (await api.get(`snippets/${id}`)).data;
    }

    async updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        return await api.put(`snippets/${id}`, {
            snippet: updateSnippet.content,
        })
    }

    getUserFriends(name?: string | undefined, page?: number | undefined, pageSize?: number | undefined): Promise<PaginatedUsers> {
        throw new Error("Method not implemented.");
    }

    async shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        return await api.post(`snippets/share`, {
            snippetId: snippetId,
            userId: userId,
        })
    }

    getFormatRules(): Promise<Rule[]> {
        throw new Error("Method not implemented.");
    }

    getLintingRules(): Promise<Rule[]> {
        throw new Error("Method not implemented.");
    }

    async getTestCases(snippetId: string): Promise<TestCase[]> {
        return (await api.get(`tests/${snippetId}`)).data;
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

    async removeTestCase(id: string): Promise<string> {
        return (await api.delete(`tests/${id}`))
    }

    async deleteSnippet(id: string): Promise<string> {
        return (await api.delete(`snippets/${id}}`))
    }

    async testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        return (await api.put(`tests/${testCase.id}`)).data.success? "success" : "fail";
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