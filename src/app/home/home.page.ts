import { Component } from '@angular/core';
import { ITask } from '../interfaces/ITask';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  tasks: ITask[] = [
    // {
    //   id: 1,
    //   title: 'Title Test',
    //   description: 'Description Test',
    //   done: false,
    //   iconName: 'checkmark-circle',
    // },
  ];

  constructor(
    private _AlertController: AlertController,
    private _Storage: Storage
  ) {}

  async ngOnInit() {
    await this._Storage.create();

    const tasks = await this._Storage.get('tasks');
    this.tasks = tasks ? JSON.parse(tasks) : [];
  }

  async open() {
    const alert = await this._AlertController.create({
      header: 'Add New Task',
      inputs: [
        {
          type: 'text',
          name: 'title',
          placeholder: 'Title',
        },
        {
          type: 'textarea',
          name: 'description',
          placeholder: 'Description',
        },
      ],
      buttons: [
        {
          text: 'Add',
          handler: async (data) => {
            if (!data.title.trim()) {
              const errorAlert = await this._AlertController.create({
                header: 'Error',
                message: 'You must enter a title. ',
                buttons: ['OK'],
              });
              await errorAlert.present();
              return false;
            }

            this.tasks.push({
              id: this.tasks.length + 1,
              title: data.title,
              description: data.description,
              done: false,
              iconName: 'checkmark-circle',
            });
            this.saveTask();
            return true;
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  }

  private async saveTask() {
    await this._Storage.set('tasks', JSON.stringify(this.tasks));
  }

  toggleTaskDone = (task: ITask, slidingItem: IonItemSliding) => {
    task.done = !task.done;
    task.iconName = task.done ? 'ban' : 'checkmark-circle';
    slidingItem.close();
    this.saveTask();
  };

  updateIDs = () => {
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i].id = i + 1;
    }
  };

  deleteTask = (task: ITask) => {
    this.tasks.splice(this.tasks.indexOf(task), 1);
    this.updateIDs();
    this.saveTask();
  };

  updateTask = async (task: ITask) => {
    const alert = await this._AlertController.create({
      header: 'Edit Task',
      inputs: [
        {
          type: 'text',
          name: 'title',
          value: task.title,
        },
        {
          type: 'textarea',
          name: 'description',
          value: task.description,
        },
      ],
      buttons: [
        {
          text: 'Update',
          handler: async (data) => {
            if (!data.title.trim()) {
              const errorAlert = await this._AlertController.create({
                header: 'Error',
                message: 'You must enter a title. ',
                buttons: ['OK'],
              });
              await errorAlert.present();
              return false;
            }
            this.tasks[this.tasks.indexOf(task)].title = data.title;
            this.tasks[this.tasks.indexOf(task)].description = data.description;
            this.saveTask();
            return true;
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await alert.present();
  };
}
