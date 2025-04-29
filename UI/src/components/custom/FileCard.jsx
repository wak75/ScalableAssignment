import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export const FileCard = ({title}) => {
    const [counter,setCounter] = useState(0)
    return (
        <Card className="flex justify-between flex-row">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row justify-between w-[200px]">
                <Button variant="outline" onClick={() => setCounter(prevCoun => prevCoun + 1)}>+</Button>
                <div>{counter}</div>
                <Button variant="outline" onClick={() => setCounter(prevCoun => prevCoun - 1)}>-</Button>

                </div>
            </CardContent>
        </Card>

    )
}