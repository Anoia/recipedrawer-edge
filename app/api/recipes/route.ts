import { type NextRequest } from 'next/server'
import { getRecipes } from '../../test-actions'

export async function GET(request:NextRequest) {

    const recipes = await getRecipes()

    return new Response(JSON.stringify(recipes), {
        status: 200
      })
  }