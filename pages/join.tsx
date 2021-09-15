import Layout from 'components/layout'
import {
  Flex,
  Heading,
  Input,
  Card,
  Label,
  Button,
  Radio,
  Select
} from 'theme-ui'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface JoinFormValues {
  email: string
  name: string
  pronouns: string
  grade: '9' | '10' | '11' | '12'
  number: string
  experience: string
}

const Home: React.FC = () => {
  const { register, handleSubmit } = useForm<JoinFormValues>()
  const [joined, setJoined] = useState(false)

  const onSubmit: SubmitHandler<JoinFormValues> = data => {
    axios
      .post('/api/join', data)
      .then(res => {
        setJoined(true)
      })
      .catch(err => {
        console.error(err)
        alert(
          `Something went wrong. Please try again, or email benjamin@chshack.club if it doesn't work.`
        )
      })
  }

  return (
    <Layout>
      <Flex
        sx={{
          mx: 'auto',
          maxWidth: 'narrow',
          alignItems: 'center',
          textAlign: 'center',
          flexDirection: 'column',
          gap: 4
        }}
      >
        <Heading
          as="h1"
          sx={{
            fontSize: 5
          }}
        >
          Join CHS Hack Club
        </Heading>
        {!joined && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card variant="sunken" sx={{ maxWidth: 'narrow', mb: 5 }}>
              <Label>
                Your BVSD Email
                <Input
                  type="email"
                  required
                  {...register('email')}
                  placeholder="myemail01@bvsd.org"
                />
              </Label>

              <Label>
                Name
                <Input required {...register('name')} placeholder="Dan Ryan" />
              </Label>

              <Label>
                Pronouns
                <Input {...register('pronouns')} />
              </Label>

              <Label>
                Grade
                <Flex sx={{ flexWrap: 'wrap' }}>
                  <Label variant="labelHoriz">
                    <Radio required {...register('grade')} value="9" /> Freshman
                  </Label>
                  <Label variant="labelHoriz">
                    <Radio {...register('grade')} value="10" /> Sophomore
                  </Label>
                  <Label variant="labelHoriz">
                    <Radio {...register('grade')} value="11" /> Junior
                  </Label>
                  <Label variant="labelHoriz">
                    <Radio {...register('grade')} value="12" /> Senior
                  </Label>
                </Flex>
              </Label>

              {/*<Label>
                Phone Number
                <Input
                  type="tel"
                  {...register('number')}
                  placeholder="3031234567"
                />
              </Label>*/}

              <Label>
                Coding Experience
                <Select {...register('experience')} required>
                  <option value="new">I've never programmed before 🤷🏼</option>
                  <option value="beginner">
                    I've taken an introductory class or equivalent 🧐
                  </option>
                  <option value="intermediate">
                    I've built a few small projects 😊
                  </option>
                  <option value="advanced">
                    I'm very good at coding and have built several projects 👍🏾
                  </option>
                  <option value="expert">I'm an expert 😎</option>
                </Select>
              </Label>

              <Button
                as="button"
                type="submit"
                children="Submit"
                sx={{ mt: 3 }}
              />
            </Card>
          </form>
        )}
        {joined && (
          <div>
            Yay! We've received your application, and will send you info about our next meeting as soon as possible!
          </div>
        )}
      </Flex>
    </Layout>
  )
}

export default Home
