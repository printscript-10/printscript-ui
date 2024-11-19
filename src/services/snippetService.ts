import { FileType } from "../types/FileType";
import { Rule } from "../types/Rule";
import { TestCase } from "../types/TestCase";
import { TestCaseResult } from "../utils/queries";
import { PaginatedSnippets, CreateSnippet, Snippet, UpdateSnippet } from "../utils/snippet";
import { SnippetOperations } from "../utils/snippetOperations";
import { PaginatedUsers, User } from "../utils/users";
import api from "./api";

export class SnippetService implements SnippetOperations {
    async listSnippetDescriptors(page: number, pageSize: number, snippetName?: string | undefined): Promise<PaginatedSnippets> {
        return (await api.get(`snippets?page=${page}&pageSize=${pageSize}&param=${snippetName}`)).data;
    }

    async createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        return await api.post(`snippets`, {
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

    async getUserFriends(name?: string | undefined, page?: number | undefined, pageSize?: number | undefined): Promise<PaginatedUsers> {
        const response =  (await api.get(`snippets/friends?page=${page}&pageSize=${pageSize}&param=${name}`)).data;

        const users: User[] = response.users.map((user: any) => {
            return {
                id: user.user_id,
                name: user.nickname,
            }
        })
        return {
            users: users,
            page: page || 0,
            page_size: pageSize || 10,
            count: response.total,
        }
    }

    async shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        return await api.post(`snippets/share`, {
            snippetId: snippetId,
            userId: userId,
        })
    }

    async getFormatRules(): Promise<Rule[]> {
        return (await api.get('rules/FORMAT')).data
    }

    async getLintingRules(): Promise<Rule[]> {
        return (await api.get('rules/LINT')).data
    }

    async getTestCases(snippetId: string): Promise<TestCase[]> {
        return (await api.get(`tests/${snippetId}`)).data;
    }

    async formatSnippet(snippet: string): Promise<string> {
        let res = (await api.post(`rules/format`, {
            snippet: snippet,
        })).data;
        console.log(res.errors)
        return res.formattedSnippet
    }

    async postTestCase(testCase: Partial<TestCase>, snippetId: string): Promise<TestCase> {
        return (await api.post(`tests/${snippetId}`, {
            name: testCase.name,
            inputs: testCase.input,
            outputs: testCase.output,
        })).data;
    }

    async removeTestCase(id: string): Promise<string> {
        return (await api.delete(`tests/${id}`))
    }

    async deleteSnippet(id: string): Promise<string> {
        return (await api.delete(`snippets/${id}`))
    }

    async testSnippet(testCase: Partial<TestCase>, snippetId: string): Promise<TestCaseResult> {
        return (await api.put(`tests`, {
            snippetId: snippetId,
            input: testCase.input,
            output: testCase.output,
        })).data.success? "success" : "fail";
    }

    async getFileTypes(): Promise<FileType[]> {
        return (await api.get('snippets/languages')).data;
    }

    async modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        return (await api.post('rules/FORMAT', newRules.filter((rule) => rule.value != null || rule.isActive != null).map((rule) => {
            return {
                ruleId: rule.id,
                isActive: rule.isActive ,
                value: rule.value?.toString() || rule.isActive?.toString(),
            }
        })));
    }

    async modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        return (await api.post('rules/LINT', newRules.filter((rule) => rule.value != null || rule.isActive != null).map((rule) => {
            return {
                ruleId: rule.id,
                isActive: rule.isActive ,
                value: rule.value?.toString() || rule.isActive?.toString(),
            }
        })));
    }

}