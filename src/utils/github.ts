import type {} from '@octokit/core'
import { OctokitOptions } from '@octokit/core/dist-types/types'
import type {} from '@octokit/plugin-paginate-rest'
import type {} from '@octokit/plugin-rest-endpoint-methods'
import { Octokit } from '@octokit/rest'
import type { Endpoints } from '@octokit/types'
import { isEqual } from 'lodash-es'
import { useCallback, useEffect, useRef, useState } from 'react'

type WrappedObject = ReturnType<typeof wrapOctokit>
const octokitMap = new Map<OctokitOptions | 'DEFAULT', WrappedObject>()

function wrapOctokit(octokit: Octokit, config?: OctokitOptions) {
  function dispose() {
    octokitMap.delete(config ?? 'DEFAULT')
  }

  return {
    octokit,
    dispose,
  }
}

/**
 * octokit/rest.js 인스턴스 생성
 *
 * @example
 * ```ts
 * const oct = await createOctokit()
 *
 * oct.octokit.rest.repos.listBranches({ ... }).then(...)
 *
 * oct.dispose() // 생성되었던 인스턴스 해제
 * ```
 */
export async function createOctokit(config?: OctokitOptions) {
  const obj = Array.from(octokitMap.entries()).find(([k]) =>
    isEqual(config ?? 'DEFAULT', k)
  )

  if (obj) {
    return obj[1]
  }

  const mod = await import('@octokit/rest')
  const octokit = new mod.Octokit(config)
  const wrapped = wrapOctokit(octokit, config)

  octokitMap.set(config ?? 'DEFAULT', wrapped)

  return wrapped
}

/**
 * hooks for using octokit instance
 */
export function useOctokit(config?: OctokitOptions) {
  const [oct, setOct] = useState<WrappedObject>()

  useEffect(() => {
    createOctokit(config).then(obj => setOct(obj))

    return () => {
      oct?.dispose()
    }
  }, [oct])
 
  return oct
}

/**
 * octokit.paginate.iterator 를 쉽게 활용할 수 있게 해 주는 훅
 * @param _ octokit이 제공하는 엔드포인트 메서드
 * @param onfulfilled 응답 처리 함수
 * @param onrejected 요청 에러 처리 함수
 * @returns 
 * 
 * @example
 * ```ts
 * const oct = useOctokit()
 * const [setIterator, invokeNext] = useOctokitIterator(
 *   oct?.octokit.repos.listBranches,
 *   res => {
 *     if (res.done) {
 *       return
 *     }

 *     setBranches(prev => [
 *       ...prev,
 *       ...res.value.data.map(({ name }) => ({
 *         label: name,
 *         value: name,
 *       })),
 *     ])
 *   }
 * )
 * 
 * const onFinish = (params: { owner: string; repo: string }) => {
 *   setList([]) // 상태 초기화
 *   setIterator(
 *     oct?.octokit.paginate.iterator(oct?.octokit.repos.listBranches, params)
 *   ) // iterator 설정
 *   invokeNext() // API호출 (마지막 페이지 조회시까지 계속 실행 가능)
 * }
 * 
 * <Form onFinish={onFinish} />
 * ```
 */
export function useOctokitIterator<
  TFunction extends (...args: any) => Promise<unknown>
>(
  _?: TFunction,
  onfulfilled?: (
    value: IteratorYieldResult<Awaited<ReturnType<TFunction>>>
  ) => void,
  onrejected?: (reason: unknown) => PromiseLike<never>
) {
  const isFetching = useRef(false)
  const iterRef = useRef<AsyncIterableIterator<unknown>>()

  const setIterator = useCallback((iter?: AsyncIterableIterator<unknown>)=> {
    if (!iter) {
      return
    }

    iterRef.current = iter[Symbol.asyncIterator]()
  },[])

  const invokeNext = useCallback(()=> {
 
    if (!iterRef.current || isFetching.current === true) {
      return
    }

    isFetching.current = true

    return iterRef.current
      .next()
      .then(onfulfilled as (value: IteratorResult<unknown>) => void, onrejected)
      .finally(() => (isFetching.current = false))
  },[onfulfilled, onrejected])

  return [setIterator, invokeNext] as const
}

export const getAllIssues = async <T extends Octokit = Octokit>(
    octokit: T,
    owner: string,
    repo: string,
    page: number,
  ): Promise<Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data']> => {
    const result = await octokit.issues.listForRepo({
      owner,
      repo,
      state: 'open',
      sort: 'comments',
      direction: 'desc',
      per_page: 100,
      page,
    });
  
    return result.data;
  };