import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TaskModule } from '../../../src/modules/task/task.module';
import { TaskService } from '../../../src/modules/task/task.service';

describe('TaskController (e2e)', () => {
  let app: INestApplication;
  let taskService = {
    findAll: () => [{ id: 1, title: 'Test Task', description: 'Test Description', status: 'pending' }],
    createTask: (dto) => ({ id: 1, ...dto }),
    updateTask: (id, dto) => ({ id, ...dto }),
    findById: (id) => ({ id, title: 'Test Task', description: 'Test Description', status: 'pending' }),
    deleteTask: (id) => undefined,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TaskModule],
    })
      .overrideProvider(TaskService)
      .useValue(taskService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('test_findAllTasks_success', () => {
    return request(app.getHttpServer()).get('/tasks').expect(200).expect(taskService.findAll());
  });

  it('test_createTask_success', () => {
    const createTaskDto = { title: 'New Task', description: 'New Description', status: 'pending' };
    return request(app.getHttpServer()).post('/tasks').send(createTaskDto).expect(201).expect(taskService.createTask(createTaskDto));
  });

  it('test_updateTask_success', () => {
    const updateTaskDto = { title: 'Updated Task', description: 'Updated Description', status: 'completed' };
    return request(app.getHttpServer()).put('/tasks/1').send(updateTaskDto).expect(200).expect(taskService.updateTask(1, updateTaskDto));
  });

  it('test_findById_nonExistentId', () => {
    jest.spyOn(taskService, 'findById').mockImplementation(() => {
      throw new Error('Not Found');
    });
    return request(app.getHttpServer()).get('/tasks/999').expect(404);
  });

  it('test_createTask_invalidData', () => {
    const invalidTaskDto = { title: '', description: '', status: 'invalid_status' };
    return request(app.getHttpServer()).post('/tasks').send(invalidTaskDto).expect(400);
  });

  it('test_deleteTask_nonExistentId', () => {
    jest.spyOn(taskService, 'deleteTask').mockImplementation(() => {
      throw new Error('Not Found');
    });
    return request(app.getHttpServer()).delete('/tasks/999').expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
